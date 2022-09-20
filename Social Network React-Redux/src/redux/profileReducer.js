const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

const initialState = {
  newPostMessage: "",
  dataPost: [
    { id: 1, message: "Hello guys", like: 15 },
    { id: 2, message: "Hey", like: 8 },
    { id: 3, message: "This is my posts", like: 10 },
  ],
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: state.dataPost.length + 1,
        message: state.newPostMessage,
        like: 0,
      };

      return {
        ...state,
        dataPost: [...state.dataPost, newPost],
        newPostMessage: "",
      };

    case UPDATE_NEW_POST_TEXT:
      return { ...state, newPostMessage: action.newText };

    default:
      return state;
  }
};

export const addPostActionCreator = () => ({
  type: ADD_POST,
});

export const updateNewPostTextActionCreator = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text,
});

export default profileReducer;
