import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className="sticky top-0 flex h-20 w-full items-center justify-baseline bg-(--color-bg)">
      <NavLink
        to="/home"
        className="group hover:group-last-of-type:group-last:h1:text absolute top-[10%] ml-[4%] flex items-center justify-center rounded-md p-0 align-middle no-underline transition-colors duration-200"
      >
        <div className="flex flex-col align-middle">
          <h1 className="font-['Impact'] text-[28px] font-light text-white no-underline transition-colors duration-200 group-hover:text-zinc-300">
            MANGAZINE
          </h1>

          <h1
            title="Heart is important"
            className="transition:200 ml-1.5 p-0 text-[18px] font-light text-white transition-colors duration-200 group-hover:text-[var(--color-red)]"
          >
            「心」が大事
          </h1>
        </div>
      </NavLink>
      <div className="group absolute right-0 grid grid-cols-5 items-end gap-x-0 border-b-2 border-zinc-700 pr-[3%] transition-colors duration-150 hover:border-white">
        <NavLink
          to="/home"
          className="relative flex w-27 flex-col items-center p-2 px-5 text-zinc-100 no-underline transition-all"
        >
          <span className="hover:text-zinc-700">HOME</span>
          <div className="absolute bottom-0 h-2 w-full border-r-2 border-zinc-700 transition-colors duration-150 group-hover:border-white">
            {" "}
          </div>
        </NavLink>

        <NavLink
          to="/readlist"
          className="relative flex w-27 flex-col items-center p-2 px-5 text-zinc-100 no-underline transition-all"
        >
          <span className="hover:text-zinc-700">READLIST</span>
          <div className="absolute bottom-0 h-2 w-full border-r-2 border-zinc-700 transition-colors duration-150 group-hover:border-white">
            {" "}
          </div>
        </NavLink>

        <NavLink
          to="/lists"
          className="relative flex w-27 flex-col items-center p-2 px-5 text-zinc-100 no-underline transition-all"
        >
          <span className="hover:text-zinc-700">LISTS</span>
          <div className="absolute bottom-0 h-2 w-full border-r-2 border-zinc-700 transition-colors duration-150 group-hover:border-white">
            {" "}
          </div>
        </NavLink>

        <NavLink
          to="/about"
          className="relative flex w-27 flex-col items-center p-2 px-5 text-zinc-100 no-underline transition-all"
        >
          <span className="hover:text-zinc-700">ABOUT</span>
          <div className="absolute bottom-0 h-2 w-full border-r-2 border-zinc-700 transition-colors duration-150 group-hover:border-white">
            {" "}
          </div>
        </NavLink>

        <NavLink
          to="/auth"
          className="relative flex w-27 flex-col items-center p-2 px-5 text-zinc-100 no-underline transition-all"
        >
          <div>
            <FontAwesomeIcon icon={faUser} className="text-[18px] hover:text-zinc-700" />
          </div>
          <div className="absolute bottom-0 h-2 w-full border-r-2 border-zinc-700 transition-colors duration-150 group-hover:border-white">
            {" "}
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
