import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";


const store = {
  _state: {
    dialogsPage: {
      newMessage: "",
      dialog: [
        { id: 1, name: "Stark" },
        { id: 2, name: "Steve Rogers" },
        { id: 3, name: "Batman" },
      ],
      messages: [
        { id: 1, message: "Hello" },
        { id: 2, message: "Hey" },
        { id: 3, message: "I am here" },
        { id: 4, message: "I am batman" },
      ],
    },

    profilePage: {
      newPostMessage: "",
      dataPost: [
        { id: 1, message: "Hello guys", like: 15 },
        { id: 2, message: "Hey", like: 8 },
        { id: 3, message: "This is my posts", like: 10 },
      ],
    },

    sideBar: {
      friends: [
        {
          id: 1,
          name: "Steve Rogers",
          img: "https://i.pinimg.com/736x/eb/72/5b/eb725b03e4eca3f5d18ee7355c77855d.jpg",
        },
        {
          id: 2,
          name: "Thor",
          img: "https://kinowar.com/wp-content/uploads/2022/07/%D1%82%D0%BE%D1%80-%D0%BB%D1%8E%D0%B1%D0%BE%D0%B2-%D1%96-%D0%B3%D1%80%D1%96%D0%BC_2.jpg",
        },
        {
          id: 3,
          name: "Batman",
          img: "https://cdn.vox-cdn.com/thumbor/MjfIGnP-mv_tWB3ptu-R19DNS8s=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/23277625/Screen_Shot_2022_02_28_at_12.43.50_PM.png",
        },
      ],
    },
  },
  // getState() {
  //   return this._state;
  // },
  _rerender() {
    console.log("render page");
  },

  subscribe(observer) {
    this._rerender = observer;
  },
  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);

    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

    this._rerender()
  },
};


export default store;
