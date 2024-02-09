import { NavLink } from "react-router-dom";
import "./header.css";

export const Header = () => {
  return (
    <div className={"container"}>
      <div className={"header"}>
        <nav className={"header__menu"}>
          <NavLink to={"/"} className={"header__menu-list"}>
            Все котики
          </NavLink>
          <NavLink to={"like"} className={"header__menu-list"}>
            Любимые котики
          </NavLink>
        </nav>
      </div>
    </div>
  );
};
