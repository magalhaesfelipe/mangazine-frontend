import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon you need

const Header = () => {
  return (
    <div className="sticky top-0 flex h-20 w-full items-center justify-baseline bg-(--color-bg)">
      <NavLink
        to="/home"
        className="group hover:group-last-of-type:group-last:h1:text absolute top-[15%] ml-[3%] flex h-25 w-48 items-center justify-center rounded-md align-middle no-underline transition-colors duration-200"
      >
        <div className="flex flex-col align-middle">
          <h1 className="font-['Impact'] text-[35px] font-light text-white no-underline transition-colors duration-200 group-hover:text-zinc-300">
            MANGAZINE
          </h1>
          <h1
            title="Heart is important"
            className="transition:200 ml-0.5 text-2xl font-light text-white transition-colors duration-200 group-hover:text-[var(--color-red)]"
          >
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
