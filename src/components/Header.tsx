import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon you need

const Header = () => {
  return (
    <div className="absolute top-0 flex h-20 w-full items-center justify-baseline">
      <NavLink
        to="/home"
        className="absolute top-[15%] ml-[3%] flex items-center rounded-md p-5 pt-0 no-underline transition-colors duration-200 hover:bg-zinc-900"
      >
        <div className="flex h-full flex-col align-middle">
          <h1 className="mr-0.5 pt-5 font-['Impact'] text-[35px] font-light text-white no-underline">
            MANGAZINE
          </h1>
          <h1 className="ml-0.5 text-2xl font-light text-white">
            「心」が大事
          </h1>
        </div>
      </NavLink>
      <div className="absolute right-[4%] flex flex-row-reverse items-center">
        <NavLink
          to="/auth"
          className="ml-[30px] border-2 border-solid border-transparent pt-[9px] pr-[10px] pb-[7px] pl-[10px] text-white no-underline transition-all duration-100 hover:border-white"
        >
          <div className="">
            AUTH
            <FontAwesomeIcon icon={faUser} className="ml-1.5" />{" "}
            {/* Use the icon */}
          </div>
        </NavLink>

        <NavLink
          to="/about"
          className="ml-[30px] border-2 border-solid border-transparent pt-[9px] pr-[10px] pb-[7px] pl-[10px] text-white no-underline transition-all duration-100 hover:border-white"
        >
          ABOUT
        </NavLink>
        <NavLink
          to="/lists"
          className="ml-[30px] border-2 border-solid border-transparent pt-[9px] pr-[10px] pb-[7px] pl-[10px] text-white no-underline transition-all duration-100 hover:border-white"
        >
          LISTS
        </NavLink>
        <NavLink
          to="/readlist"
          className="ml-[30px] border-2 border-solid border-transparent pt-[9px] pr-[10px] pb-[7px] pl-[10px] text-white no-underline transition-all duration-100 hover:border-white"
        >
          READLIST
        </NavLink>
        <NavLink
          to="/home"
          className="ml-[30px] border-2 border-solid border-transparent pt-[9px] pr-[10px] pb-[7px] pl-[10px] text-white no-underline transition-all duration-100 hover:border-white"
        >
          HOME
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
