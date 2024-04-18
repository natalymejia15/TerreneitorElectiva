import { Link, NavLink, useNavigate } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../auth";


export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const onLogout = () => {
    logout();

    navigate('/login', {
      replace: true
    });
  }

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className="navbar-brand text-light"> RetroGames </Link>

        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="/homeProduct" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Products</NavLink>
            </li>
          </ul>
          <span className="nav-item navbar-link text-primary">
            {user?.name}
          </span>
          <button className="nav-item nav-link btn text-light" onClick={() => onLogout()}>
            Logout
          </button>
        </div>
      </nav>
    </>
  )
}