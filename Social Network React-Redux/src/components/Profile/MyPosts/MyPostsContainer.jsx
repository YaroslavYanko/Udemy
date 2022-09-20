import MyPosts from "./MyPosts";

import {
  addPostActionCreator,
  updateNewPostTextActionCreator,
} from "../../../redux/profileReducer";

import { connect } from "react-redux";

// const MyPostContainer = () => {
//   return (
//     <StoreContext.Consumer>
//       {(store) => {
//         let addPost = () => {
//           store.dispatch(addPostActionCreator());
//         };
//         const changePost = (text) => {
//           store.dispatch(updateNewPostTextActionCreator(text));
//         };

//         return (
//           <MyPosts
//             updateNewPostText={changePost}
//             addNewPost={addPost}
//             profilePage={store.getState().profilePage}
//           />
//         );
//       }}
//     </StoreContext.Consumer>
//   );
// };

const mapStateToProps = (state) => {
  return {
    profilePage: state.profilePage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addNewPost: () => {
      dispatch(addPostActionCreator());
    },
    updateNewPostText: (text) => {
      dispatch(updateNewPostTextActionCreator(text));
    },
  };
};

const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostContainer;
