import { NavLink } from "react-router-dom"
import BurgerMenu from "./BurgerMenu"

/*Languages and Auth context*/
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
    <header className="full">
      <BurgerMenu/>
      <nav className="navbar">
        <ul>
          <li><NavLink to="/">{strings.navbar.links.home}</NavLink></li>

          <li><NavLink to="/departments">{strings.navbar.links.departments}</NavLink></li>
          
          <li><NavLink to="/gpractice">{strings.navbar.links.gpractice}</NavLink></li>

          {!user && <li><NavLink to="/signup">{strings.navbar.links.signup}</NavLink></li>}

          {!user && <li><NavLink to="/login">{strings.navbar.links.login}</NavLink></li>}

          {user && <li><NavLink to="/account">{strings.navbar.links.account}</NavLink></li>}


          {user && <li>{user.username} ({user.role})</li>}

          {user && user.role==="admin" && <li><NavLink to="/admin">Admin Page</NavLink></li>}
          
          {user && <li><button onClick={logOutUser}>Logout</button></li>}
        </ul>
      </nav>

      <div className="containerToggle lang">
        {/* <!-- Languages button --> */}
        <button id="languageBtn" onClick={changeLanguage}>{lang}</button>
      </div>
    </header>
  )
}

export default Navbar
