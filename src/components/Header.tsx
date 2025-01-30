import classes from "./header.module.css";
import { NavLink } from "react-router-dom";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";

const Header = () => {
  const { isSignedIn, user } = useUser();

  return (
    <div className="absolute top-10 w-full flex items-center justify-baseline mt-[6%]">
      <NavLink to="/home" className="no-underline ml-[5%]">
        <div className="flex flex-col relative bg-yellowgreen h-full">
          <h1 className="text-[35px] text-[var(--main-color)] font-fantasy font-light no-underlinel absolute top-[-35px]">
            MANGAZINE
          </h1>
          <h1 className="text-white text-2xl mr-2 absolute bottom-[-34px] right-[-165px]">「心」が大事</h1>
        </div>
      </NavLink>
      <div className="absolute right-[4%] flex flex-row-reverse items-center">
        <SignedIn>
          <div className="ml-[20px]">
            <UserButton />
          </div>
        </SignedIn>
        {!isSignedIn && (
          <NavLink to="/auth" className="ml-[30px] no-underline text-white pt-[9px] pb-[7px] pr-[10px] pl-[10px] border-solid border-2 border-transparent hover:border-white transition-all duration-100">
            <div className="ml-2 text-2xl">
              AUTH
              <i className="fa-regular fa-user"></i>
            </div>
          </NavLink>
        )}

        <NavLink to="/about" className="ml-[30px] no-underline text-white pt-[9px] pb-[7px] pr-[10px] pl-[10px] border-solid border-2 border-transparent hover:border-white transition-all duration-100">
          ABOUT
        </NavLink>
        <SignedIn>
          <NavLink to="/lists" className="ml-[30px] no-underline text-white pt-[9px] pb-[7px] pr-[10px] pl-[10px] border-solid border-2 border-transparent hover:border-white transition-all duration-100">
            LISTS
          </NavLink>
        </SignedIn>
        <NavLink to="/readlist" className="ml-[30px] no-underline text-white pt-[9px] pb-[7px] pr-[10px] pl-[10px] border-solid border-2 border-transparent hover:border-white transition-all duration-100">
          READLIST
        </NavLink>
        <NavLink to="/home" className="ml-[30px] no-underline text-white pt-[9px] pb-[7px] pr-[10px] pl-[10px] border-solid border-2 border-transparent hover:border-white transition-all duration-100">
          HOME
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
