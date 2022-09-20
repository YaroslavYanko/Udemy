import { Link } from "react-router-dom";

import classes from "./DialogUser.module.css";

const DialogUser = ({ name, id }) => {
 
    return (
      <li  className={classes.user__dialog}>
        <Link to={`${id}`}>
           {/* <img src={img} alt="userAvatar" /> */}
          {name}</Link>
      </li>
    );
  };

export default DialogUser