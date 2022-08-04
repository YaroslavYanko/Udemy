"use strict";

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-10-23T07:42:02.383Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2022-05-10T23:36:17.929Z",
    "2022-05-14T10:51:36.790Z",
  ],
  currency: "UAH",
  locale: "uk-UA", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;

  //Метод формату дати
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  //Виводим HTML теги з банкіськими розрахунками
  containerMovements.innerHTML = null;

  //Сортуєм масив якщо sort=true і робим копію масива=slice
 
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach((element, index) => {
    const type = element > 0 ? "deposit" : "withdrawal";

    //Метод формату чисел
    const formattedMov = formatCur(element, acc.locale, acc.currency);

    //Метод формату дати
    const date = new Date(acc.movementsDates[index]);
    const displayDate = formatMovementDate(date, acc.locale);

    const html = `<div class="movements__row">
               <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
               <div class="movements__date">${displayDate}</div>
               <div class="movements__value">${formattedMov} </div>
             </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
//displayMovements(account1.movements);

const createUsernames = (accounts) => {
  //Добавляєм нову змінну "name" до оєктів користувачів
  //з ініціалами перщих букв
  accounts.forEach((account) => {
    //1. forEach міняє основний обєкт , нічого не вертає
    account.name = account.owner
      .toLowerCase()
      .split(" ")
      //2. map вертає новий обєкт з ініціалами
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

const calcDisplaySummary = (acc) => {
  //Загальна сума внесиних коштів(дебет)
  //movements: [200, 450, -400, 3000, -650, -130, 70, 1300]
  // interestRate: 1.2, // %
  const income = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  //Загальна сума знятих коштів(кредит)
  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  //Відсотки які надає банк за кожний депозит коштів 1.2 %
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    //Фільтруєм процент нижче 1
    .filter((mov) => mov >= 1)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${formatCur(income, acc.locale, acc.currency)}`;
  labelSumOut.textContent = `${formatCur(out, acc.locale, acc.currency)} `;
  labelSumInterest.textContent = `${formatCur(
    interest,
    acc.locale,
    acc.currency
  )} `;
  // labelSumOut.textContent = `${Math.abs(out).toFixed(2)} ₴`;
  // labelSumInterest.textContent = `${Math.abs(interest).toFixed(2)} ₴`;
};
//calcDisplaySummary(account1.movements);

const calcDisplayBalance = (acc) => {
  //Вираховуєм кредит і дебет в загальну суму
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);

  //Метод формату чисел
  const formattedMov = formatCur(acc.balance, acc.locale, acc.currency);

  labelBalance.textContent = `${formattedMov}`;
};

//calcDisplayBalance(account1.movements);

let currentAccount, timer;

const updateUI = function (currentAccount) {
  //Оновлюєм дані користувача на UI інтерфейс
  displayMovements(currentAccount);
  calcDisplaySummary(currentAccount);
  calcDisplayBalance(currentAccount);
};

//Закриває інтерфейс після 2 хвилин
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }
    --time;
  };
  //2 хвилини
  let time = 120;

  tick();

  let timer = setInterval(tick, 1000);

  return timer;
};

const updateTimer = function () {
  //Очищаєм таймер
  clearInterval(timer);
  //Поновлюєм таймер
  timer = startLogOutTimer();
};

//TESTING
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

//Функція входу користувача
btnLogin.addEventListener("click", function (event) {
  //preventDefault відміняє відправку форми
  event.preventDefault();

  //Перевірка даних userName
  currentAccount = accounts.find(
    (acc) => acc.name === inputLoginUsername.value
  );

  //Якщо find верне undefind при неправильному імені
  //currentAccount?. чи інсує такий користувач

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Оновлюєм дані користувача на UI інтерфейс
    updateUI(currentAccount);

    //Таймер виходу
    //Якщо час вже іде ми його видадяєм при зміні користувачів
    if (timer) {
      clearInterval(timer);
    }
    //timer глобальна змінна яка приймає час від setInterval
    timer = startLogOutTimer(timer);

    //Виставляєм поточну дату і час
    const now = new Date();
    const option = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };

    //const locale = navigator.language;

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      option
    ).format(now);

    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = now.getHours();
    // const min = now.getMinutes();

    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    //Виводим тільки імя користувача
    labelWelcome.textContent = `Welcome back ${currentAccount.owner
      .split(" ")
      .slice(0, 1)}`;
    // opacity: 0;
    // transition: all 1s;
    //Анімація появи блоку
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginUsername.blur();
    inputLoginPin.blur();
  } else {
    console.log("wrong password or name");
  }
});

btnTransfer.addEventListener("click", function (event) {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);

  const receiverAcc = accounts.find(
    (user) => user.name === inputTransferTo.value
  );

  //calcDisplayBalance()
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.name !== currentAccount.name
  ) {
    //currentAccount знімаєм суму з активного користувача
    currentAccount.movements.push(-amount);
    //receiverAcc передаєм суму іншому користувачу
    receiverAcc.movements.push(amount);
    //Добавляєм дату
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    //Оновлюєм UI
    updateUI(currentAccount);
    //Поновлюєм таймер
    updateTimer();
  }
  inputTransferAmount.value = inputTransferTo.value = "";
});

//Позика
btnLoan.addEventListener("click", function (event) {
  event.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);
  //some = якщо елемент більше 10%
  if (amount > 0 && currentAccount.movements.some((m) => m >= amount * 0.1)) {
    //Виводим позику з затримкою 2 секунди
    setTimeout(() => {
      currentAccount.movements.push(amount);

      currentAccount.movementsDates.push(new Date().toISOString());

      updateUI(currentAccount);
    }, 2000);
    //Поновлюєм таймер
    updateTimer();
  }

  inputLoanAmount.value = "";
});

//Видалити рахунок
btnClose.addEventListener("click", function (event) {
  event.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.name &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex((i) => i.name === currentAccount.name);
    //Видаляєм користувача
    accounts.splice(index, 1);
    //Приховати UI
    containerApp.style.opacity = 0;
  } else {
    inputCloseUsername.value = inputClosePin.value = "";
  }
});
//Сотуєм масив з грошима
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;

  //Поновлюєм таймер
  updateTimer();
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// setInterval(() => {
//   const now = new Date()
//   const option = {
//     hour:'numeric',
//     minute:'numeric',
//     second:'numeric'
//   }

//   document.querySelector('.date').textContent = new Intl.DateTimeFormat('uk-UA',option).format(now)
// }, 1000);
