import { NavLink } from "react-router-dom";

/*Languages context*/
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { LanguageContext } from "../context/language.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const { lang, strings, setLang } = useContext(LanguageContext);

  function changeLanguage() {
    // return french if it's english and vice versa
    setLang((lang) => {
      return lang == "EN" ? "FR" : "EN";
    });
  }

  return (
    <header>
      <nav className="navbar">
        <ul>
          <NavLink to="/">{strings.navbar.links.home}</NavLink>

          {!user &&<NavLink to="/signup">{strings.navbar.links.signup}</NavLink>}

          {!user && <NavLink to="/login">{strings.navbar.links.login}</NavLink>}

          {user &&<NavLink to="/account">{strings.navbar.links.account}</NavLink>}

          {user &&<NavLink to="/editaccount">
            {strings.navbar.links.editaccount}
          </NavLink>}
          <span>{user && user.username}</span>
          {user && user.role==="admin" && <NavLink to="/admin">Admin Page</NavLink>}
          {user && <button onClick={logOutUser}>Logout</button>}
        </ul>
      </nav>

      <div className="containerToggle lang">
        {/* <!-- Languages button --> */}
        <button id="languageBtn" onClick={changeLanguage}>
          {lang}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
