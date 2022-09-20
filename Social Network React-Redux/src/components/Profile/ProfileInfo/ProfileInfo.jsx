import classes from "./ProfileInfo.module.css";

const ProfileInfo = () => {
  return (
    <>
      <img
        className={classes.app__content_img}
        src="https://prokarpatylviv.com/wp-content/uploads/img-051235460774.jpg"
        alt="img_content"
      />
      <div className={classes.app__content_user}>
        <img
          src="https://images.immediate.co.uk/production/volatile/sites/3/2022/07/Thor-Love-and-Thunder-Ravager-jacket-3884b08.jpg?quality=45&resize=620,413"
          alt="user_photo"
        />
      </div>
    </>
  );
};

export default ProfileInfo;
