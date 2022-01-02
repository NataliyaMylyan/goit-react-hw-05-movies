import { NavLink, Outlet } from "react-router-dom";
import s from "./navigation.module.css";

const setActive = ({ isActive }) => (isActive ? s.active : s.inactive);
const Navigation = () => (
  <>
    <nav className={s.navigation}>
      <div className={s.wrapper}>
        <NavLink to="/" className={setActive}>
          Home
        </NavLink>

        <NavLink to="/movies" className={setActive}>
          Movies
        </NavLink>
      </div>
    </nav>
    <Outlet />
  </>
);

export default Navigation;
