import { NavLink } from "react-router-dom"

/*Languages context*/
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { LanguageContext } from "../context/language.context"

function Navbar() {
  const {  user, logOutUser } = useContext(AuthContext);
  const { lang, strings, setLang } = useContext(LanguageContext);

  function changeLanguage() {
    // return french if it's english and vice versa
    setLang((lang) => {
      return lang == "EN" ? "FR" : "EN"
    })
  }

  return (
    <header>
      <nav className="navbar">
        <ul>
          <li><NavLink to="/">{strings.navbar.links.home}</NavLink></li>

          <li><NavLink to="/departments">{strings.navbar.links.departments}</NavLink></li>

          <li>{!user &&<NavLink to="/signup">{strings.navbar.links.signup}</NavLink>}</li>

          <li>{!user && <NavLink to="/login">{strings.navbar.links.login}</NavLink>}</li>

          <li>{user &&<NavLink to="/account">{strings.navbar.links.account}</NavLink>}</li>

          <li>{user &&<NavLink to="/editaccount">
            {strings.navbar.links.editaccount}
          </NavLink>}</li>
          <li><span>{user && user.username}</span></li>
          <li>{user && user.role==="admin" && <NavLink to="/admin">Admin Page</NavLink>}</li>
          <li>{user && <button onClick={logOutUser}>Logout</button>}</li>
        </ul>
      </nav>

      <div className="containerToggle lang">
        {/* <!-- Languages button --> */}
        <button id="languageBtn" onClick={changeLanguage}>
          {lang}
        </button>
      </div>
    </header>
  )
}

export default Navbar
