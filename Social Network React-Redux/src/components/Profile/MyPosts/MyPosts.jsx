import { useRef } from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = ({ addNewPost, updateNewPostText, profilePage }) => {
  let newPostElement = useRef();

  let addPost = () => {
    addNewPost();
  };
  const changePost = () => {
    let text = newPostElement.current.value;
    updateNewPostText(text);
  };

  return (
    <>
      <div>My posts</div>
      <div>
        <input
          value={profilePage.newPostMessage}
          onChange={changePost}
          ref={newPostElement}
          className={classes.posts__input}
          type="text"
        />
        <input
          onClick={addPost}
          className={classes.posts__button_send}
          type="button"
          value="Send"
        />
      </div>
      {profilePage.dataPost.map((post) => (
        <Post key={post.id} message={post.message} id={post.id} like={post.like} />
      ))}
    </>
  );
};

export default MyPosts;
