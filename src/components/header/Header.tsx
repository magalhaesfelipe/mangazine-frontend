import classes from "./header.module.css";
import { NavLink } from "react-router-dom";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";

const Header = () => {
  const { isSignedIn, user } = useUser();

  return (
    <div className={classes.menu}>
      <NavLink to="/home" className={classes.titleLink}>
        <div className={classes.logoContainer}>
          <h1 className={classes.title}>MANGAZINE</h1>
          <h1 className={classes.symbol}>「心」が大事</h1>
        </div>
      </NavLink>
      <div className={classes.links}>
        <SignedIn>
          <div className={classes.userButton}>
            <UserButton />
          </div>
        </SignedIn>
        {!isSignedIn && (
          <NavLink to="/auth" className={classes.link}>
            <div className={classes.iconContainer}>
            AUTH
            <i className="fa-regular fa-user"></i>
            </div>
          </NavLink>
        )}

        <NavLink to="/about" className={classes.link}>
          ABOUT
        </NavLink>
        <SignedIn>
          <NavLink to="/lists" className={classes.link}>
            LISTS
          </NavLink>
        </SignedIn>
        <NavLink to="/readlist" className={classes.link}>
          READLIST
        </NavLink>
        <NavLink to="/home" className={classes.link}>
          HOME
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
