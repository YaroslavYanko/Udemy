"use strict";

class Workout {
  date = new Date();
  id = (Date.now() + "").slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords; //[lat,lng]
    this.distance = distance; //км
    this.duration = duration; //хв
  }
  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  type = "running";
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence; //Ритм
    this.calcPace();
    this._setDescription();
  }
  calcPace() {
    //хв/км
    this.pace = (this.duration / this.distance).toFixed(1);
    return this;
  }
}

class Cycling extends Workout {
  type = "cycling";
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain; //підвищення висоти
    this.calcSpeed();
    this._setDescription();
  }
  calcSpeed() {
    //км/год
    this.speed = this.distance / (this.duration / 60).toFixed(1);
    return this;
  }
}

const modelForm = document.querySelector(".model_form");
const form = document.querySelector(".form");
const boxWorkout = document.querySelector(".box_workout");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");
const btnDelWork = document.querySelector(".workout_delete");
const btnSort = document.querySelector(".btn_sort");

class App {
  #map;
  #mapZoomLevl = 13;
  #mapEvent;
  #workouts = [];
  indexEdit;
  sortWorkouts = [];
  sortType = false;
  markerCoords = [];

  constructor() {
    //Місце знаходження користувача
    this._getPosition();

    //Local Storage
    this._getLocalStorage();

    //Використовуєм bind так як ключове слово this буде зсилатись на form а не не обєкт класу
    form.addEventListener("submit", this._newWorkout.bind(this));
    inputType.addEventListener("change", this._toggleElevationField);
    containerWorkouts.addEventListener("click", this._moveToPopup.bind(this));
    containerWorkouts.addEventListener("click", this.deleteWorkout.bind(this));
    containerWorkouts.addEventListener("click", this.editWorkout.bind(this));
    containerWorkouts.addEventListener("click", this.editValue.bind(this));
    containerWorkouts.addEventListener("click", this.editCancel.bind(this));
    btnSort.addEventListener("click", this.sortWorkout.bind(this));
  }
  _getPosition() {
    if (navigator.geolocation) {
      //під час звичайного виклику функції _loadMap,
      //для цього ключового слова встановлено значення undefined.
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Не знайшли вашої геолокації");
        }
      );
    }
  }
  _loadMap(position) {
    //Широта, Довгота
    const { latitude, longitude } = position.coords;

    const coords = [latitude, longitude];

    this.#map = L.map("map").setView(coords, this.#mapZoomLevl);

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    L.marker(coords).addTo(this.#map).bindPopup("My position").openPopup();
    L.marker.remove;
    //Клік по карті
    this.#map.on("click", this._showForm.bind(this));

    //з Local Storage витягуєм дані для маркера
    //так як карта загружається не зразу
    this.#workouts.forEach((work) => {
      this._renderWorkoutMarker(work);
    });
  }
  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  }
  _hideForm() {
    inputElevation.value =
      inputCadence.value =
      inputDuration.value =
      inputDistance.value =
        "";
    form.style.display = "none";
    form.classList.add("hidden");
    setTimeout(() => {
      //Для плавної анімації при появі блоку
      form.style.display = "grid";
    }, 1000);
  }
  //Переключаєм форму з бігу на велосипед
  _toggleElevationField() {
    //closest піднімаєся до батьківського елемента .form__row
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }

  validInputs = (...input) => input.every((inp) => Number.isFinite(inp));

  allPositive = (...input) => input.every((inp) => inp > 0);

  modelFormWindow() {
    if (document.querySelector(".model_form_window")) return;

    let modalAlert = `<div class="model_form_window"><h2>Заповніть поля правильно</h2></div>`;
    modelForm.insertAdjacentHTML("afterbegin", modalAlert);

    setTimeout(() => {
      modelForm.firstElementChild.remove();
    }, 2000);
  }

  //Показуєм форму коли нажимаєм Enter
  _newWorkout(e) {
    //Перевірка форми даних
    //Метод every вертає true/false
    //верне false якщо хоч одне значення буде false
    // const validInputs = (...input) =>
    //   input.every((inp) => Number.isFinite(inp));
    // const allPositive = (...input) => input.every((inp) => inp > 0);
    e.preventDefault();

    //Получаєм дані форми
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    let workout;
    //mapEvent приватна змінна від map.on кліку по карті з координатами
    const { lat, lng } = this.#mapEvent.latlng;

    //Якщо вибраний біг
    if (type === "running") {
      const cadence = +inputCadence.value;
      console.log(this.validInputs(distance, duration, cadence));
      if (
        !this.validInputs(distance, duration, cadence) ||
        !this.allPositive(distance, duration)
      )
        return this.modelFormWindow();
      workout = new Running([lat, lng], distance, duration, cadence);
    }

    //Якщо вибраний велосипед
    if (type === "cycling") {
      const elevation = +inputElevation.value;
      if (
        !this.validInputs(distance, duration, elevation) ||
        !this.allPositive(distance, duration)
      )
        return this.modelFormWindow();
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    //Показати лист тренувань
    this._renderWorkout(workout);
    //Добавити новий обєкт до масиву
    this.#workouts.push(workout);

    //Поставити маркер на карті
    this._renderWorkoutMarker(workout);

    //Ховамє форму
    this._hideForm();

    //Зберігаєм в Local Storage
    this._setLocalStorage();
  }

  restoreValueEdit() {
    document.querySelectorAll(".form__input").forEach((el) => (el.value = ""));
  }

  editValue(e) {
    const confirmBtn = e.target.closest(".confirm");

    if (!confirmBtn) return;

    let distance = Number(
      confirmBtn.closest(".workout").querySelector(".form__input--1").value
    );
    let duration = Number(
      confirmBtn.closest(".workout").querySelector(".form__input--2").value
    );
    let cadEle = Number(
      confirmBtn.closest(".workout").querySelector(".form__input--3").value
    );

    if (
      !this.validInputs(distance, duration, cadEle) ||
      !this.allPositive(distance, duration, cadEle)
    ) {
      return this.modelFormWindow();
    }
    // prettier-ignore
    confirmBtn.closest(".workout").querySelector(".distance").textContent =this.#workouts[this.indexEdit].distance = distance;
    // prettier-ignore
    confirmBtn.closest(".workout").querySelector(".duration").textContent =this.#workouts[this.indexEdit].duration = duration;

    if (this.#workouts[this.indexEdit].type === "running") {
      // prettier-ignore
      confirmBtn.closest(".workout").querySelector(".cadence").textContent =this.#workouts[this.indexEdit].cadence = cadEle;
      // prettier-ignore
      confirmBtn.closest(".workout").querySelector(".cadEle").textContent =this.#workouts[this.indexEdit].pace = (duration / distance).toFixed(1);
    }
    if (this.#workouts[this.indexEdit].type === "cycling") {
      // prettier-ignore
      confirmBtn.closest(".workout").querySelector(".cadEle").textContent = this.#workouts[this.indexEdit].speed = cadEle;
      // prettier-ignore
      confirmBtn.closest(".workout").querySelector(".elevationGain").textContent = this.#workouts[this.indexEdit].elevationGain = distance / (duration / 60).toFixed(1);
    }

    this.restoreValueEdit();

    this.resetLocStor();

    this._setLocalStorage();
    // this.editHTMLtrening(confirmBtn);
  }

  //Редагуєм тренування
  editWorkout(e) {
    const editBnt = e.target.closest(".workout_btn_edit");

    if (!editBnt) return;

    document.querySelectorAll(".edit_form_input").forEach((el, i) => {
      el.classList.add("hidden");
      document
        .querySelectorAll(".workout_block_edit")
        [i].classList.add("hidden");
    });

    editBnt
      .closest(".workout")
      .querySelector(".edit_form_input")
      .classList.remove("hidden");
    editBnt
      .closest(".workout")
      .querySelector(".workout_block_edit")
      .classList.remove("hidden");

    this.indexEdit = this.#workouts.findIndex(
      (el) => editBnt.closest(".workout").dataset.id === el.id
    );

    this.restoreValueEdit();
  }

  //Закрити форму для зімни тренування
  editCancel(e) {
    const workoutEl = e.target.closest(".cancel");
    if (!workoutEl) return;

    document.querySelectorAll(".edit_form_input").forEach((el, i) => {
      el.classList.add("hidden");
      document
        .querySelectorAll(".workout_block_edit")
        [i].classList.add("hidden");
    });
    this.sortWorkout();
    this.restoreValueEdit();
  }

  //Видадяєм тренування
  deleteWorkout(e) {
    const workoutEl = e.target.closest(".workout_btn_delete");
    if (!workoutEl) return;
    let index = this.#workouts.findIndex(
      (el) => workoutEl.parentElement.parentElement.dataset.id === el.id
    );

    ///////////////

    if (
      this.#workouts[index].coords[0] === this.markerCoords[index]._latlng.lat ||  this.#workouts[index].coords[1] === this.markerCoords[index]._latlng.lng
    ) {
      this.markerCoords[index].remove();
    }

    this.#workouts.splice(index, 1);
    workoutEl.closest(".workout").remove();
    this._setLocalStorage();


    
  }

  _renderWorkoutMarker(workout) {
    //Показати маркер
    this.markerCoords.push(
      L.marker(workout.coords)
        .addTo(this.#map)
        .bindPopup(
          L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${workout.type}-popup`,
          })
        )
        .setPopupContent(
          `${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${workout.description}`
        )
        .openPopup()
    );
  }

  _renderWorkout(workout) {
    let html = `
   <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"
            }</span>
            <span class="workout__value distance">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value duration">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>`;
    if (workout.type === "running") {
      html += `
      <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value cadEle">${workout.pace}</span>
      <span class="workout__unit">min/km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">🦶🏼</span>
      <span class="workout__value cadence">${workout.cadence}</span>
      <span class="workout__unit">spm</span>
      
    </div>
 
  <div class="edit_form_input hidden">
    <input class="form__input form__input--1 ">
    <input class="form__input form__input--2">
    <input class="form__input form__input--3">

  </div>
   <div class="edit_form ">
         <button class="workout_btn_delete">Delete</button>
 
         <button class="workout_btn_edit">Edit</button>
         <div class="workout_block_edit hidden">
         <img class="workout_btn_edit_img confirm" src="check.png" alt="">
         <img class="workout_btn_edit_img cancel" src="close.png" alt="">
 
         </div>
    
         </div>
    </li>`;
    }

    if (workout.type === "cycling") {
      html += `
      <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value cadEle">${workout.speed}</span>
      <span class="workout__unit">km/h</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⛰</span>
      <span class="workout__value elevationGain">${workout.elevationGain}</span>
      <span class="workout__unit">m</span>
    </div>
    <div class="edit_form_input hidden">
    <input class="form__input form__input--1">
    <input class="form__input form__input--2">
    <input class="form__input form__input--3">

  </div>
   <div class="edit_form ">
         <button class="workout_btn_delete">Delete</button>
 
         <button class="workout_btn_edit">Edit</button>
         <div class="workout_block_edit hidden">
         <img class="workout_btn_edit_img confirm" src="check.png" alt="">
         <img class="workout_btn_edit_img cancel" src="close.png" alt="">
 
         </div>
    
         </div>
  </li>`;
    }
    //boxWorkout.innerHTML += html;
    boxWorkout.insertAdjacentHTML("afterbegin", html);
  }

  sortWorkout() {
    boxWorkout.innerHTML = "";
    this.sortWorkouts = [];

    let cycling = this.#workouts.filter((el) => el.type === "cycling");
    let running = this.#workouts.filter((el) => el.type === "running");

    this.sortWorkouts.push(...running, ...cycling);

    this.sortWorkouts.forEach((el, i) => {
      if (!this.sortType) {
        this._renderWorkout(el);
      } else {
        this._renderWorkout(this.#workouts[i]);
      }
    });
    this.sortType = !this.sortType;
  }
  _moveToPopup(e) {
    //closest елементи які знаходять в блоці .workout , але не сам елемент
    const workoutEl = e.target.closest(".workout");
    if (!workoutEl) return;
    const workout = this.#workouts.find((el) => workoutEl.dataset.id === el.id);
    if (!workout) return;
    this.#map.setView(workout.coords, this.#mapZoomLevl, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }
  _setLocalStorage() {
    localStorage.setItem("workout", JSON.stringify(this.#workouts));
  }
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("workout"));

    if (!data) return;

    this.#workouts = data;

    this.#workouts.forEach((work) => {
      this._renderWorkout(work);
    });
  }
  resetLocStor() {
    localStorage.removeItem("workout");
  }
}

const app = new App();
