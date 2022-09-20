const ADD_MESSAGE = "ADD-MASSAGE";
const UPDATE_NEW_MESSAGE = "UPDATE-NEW-MESSAGE";

const initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      let newMessage = {
        id: state.messages.length + 1,
        message: state.newMessage,
      };
      return {
        ...state,
        messages: [...state.messages, newMessage],
        newMessage: "",
      };

   

    case UPDATE_NEW_MESSAGE:
      return { ...state, newMessage: action.newText };

    default:
      return state;
  }
};

export const addNewMessageActionCreator = () => ({
  type: ADD_MESSAGE,
});

export const updateNewMessageActionCreator = (text) => ({
  type: UPDATE_NEW_MESSAGE,
  newText: text,
});

export default dialogsReducer;
