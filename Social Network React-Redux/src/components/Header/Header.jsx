import classes from './Header.module.css'

const Header = () => {
  return (
    <header className={classes.app__header}>
      <img
        src="https://cdn141.picsart.com/340177932045211.png?to=crop&type=webp&r=310x310&q=50"
        alt="logo"
      />
    </header>
  );
};

export default Header;
