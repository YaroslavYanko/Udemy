import MyPostsContainer from "./MyPosts/MyPostsContainer";
import classes from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = () => {

  return (
    <div className={classes.app__content}>
      <ProfileInfo/>
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
