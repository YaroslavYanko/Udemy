

import classes from "./MessageUser.module.css";

const MessageUser = ({ message,id }) => {
    return <li  className={classes.message}>{message}</li>;
  };

export default MessageUser