import css from "./Header.module.scss";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import SearchPanel from "@features/search-panel";

const Header = () => {
  const coords = useSelector((state) => state.coords);
  const activeLinkStyle = {
    color: "white",
    textShadow: "0 1px 5px rgba(0,0,0,0.5)",
    transition: "all .1s ease-out",
  };

  return (
    <header className={css.header}>
      <nav className={css.navigation}>
        <ul className={css.navigationList}>
          <li className={css.navigationItem}>
            <NavLink
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              to={`/?lat=${coords.latitude}&lon=${coords.longitude}`}
              className={css.navigationLink}
            >
              Main page
            </NavLink>
          </li>
          <li className={css.navigationItem}>
            <NavLink
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              to="/tenDaysWeather"
              className={css.navigationLink}
            >
              Погода на 10 дней
            </NavLink>
          </li>
        </ul>
      </nav>

      <SearchPanel />
    </header>
  );
};

export default Header;
