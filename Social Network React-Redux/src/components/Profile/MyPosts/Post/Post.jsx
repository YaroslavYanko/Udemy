import classes from "./Post.module.css";

const Post = ({id,message,like}) => {
  return (
    <div  className={classes.post}>
      <img
       className={classes.post__img}
        src="https://i.xiaomi.ua/u/CatalogueImage/toy-xiaiomi-iron-man-mk43-001344231594829249.jpg"
        alt="post_photo"
      />
      <div className={classes.post__text}>{message}</div>
      <span>{like}</span>
    </div>
  );
};

export default Post;
