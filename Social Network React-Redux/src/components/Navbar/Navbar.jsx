import { Link, useLocation } from "react-router-dom";

import classes from "./Navbar.module.css";

const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (
    <nav className={classes.app__nav}>
      <ul>
        <li className={classes.item}>
          <Link
            to="/profile"
            className={splitLocation[1] === "profile" ? classes.active : ""}
          >
            Profile
          </Link>
        </li>
        <li className={classes.item}>
          <Link
            to="/dialogs"
            className={splitLocation[1] === "dialogs" ? classes.active : ""}
          >
            Dialogs
          </Link>
        </li>
        <li className={classes.item}>
          <Link
            to="/new"
            className={splitLocation[1] === "new" ? classes.active : ""}
          >
            News
          </Link>
        </li>
        <li className={classes.item}>
          <Link
            to="/music"
            className={splitLocation[1] === "music" ? classes.active : ""}
          >
            Music
          </Link>
        </li>
      </ul>
      {/* <div className={classes.app__nav_friends}>
        <ul>
          {sideBar.friends.map((friend) => (
            <li className={classes.app__nav_friends_friend}>
              <Link to={"/"}>
                <img src={friend.img} alt="" />
                {friend.name}
              </Link>
            </li>
          ))}
        </ul>
      </div> */}
    </nav>
  );
};

export default Navbar;
