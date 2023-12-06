import { NavLink, useNavigate } from "react-router-dom"
import BurgerMenu from "./BurgerMenu"
import Logo from "/public/images/Logo.png"

/*Languages and Auth context*/
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { LanguageContext } from "../context/language.context"


function Navbar() {
  const { user, logOutUser } = useContext(AuthContext);
  const { lang, strings, setLang } = useContext(LanguageContext);

  function changeLanguage() {
    // return french if it's english and vice versa
    setLang((lang) => {
      return lang == "EN" ? "FR" : "EN"
    })
  }

  // change the icon menu status even if the icone is not clicked
  const animate = () => {
    const button = document.querySelector(".hamburger-menu")
    const currentState = button.getAttribute("data-state")

    if (!currentState || currentState === "closed") {
      button.setAttribute("data-state", "opened")
      button.setAttribute("aria-expanded", "true")
    }
    else {
      button.setAttribute("data-state", "closed")
      button.setAttribute("aria-expanded", "false")
    }
  }

  // change the icon menu status even if the icone is not clicked
  const searchTrigger = () => {
    const searchBar = document.querySelector(".search-bar")

    if (searchBar.style.display === "block") {
      searchBar.style.display = "none"
    }
    else {
      searchBar.style.display = "block"
      searchBar.style.animation = "searchAnimation var(--timing05) ease-in-out normal"
    }
  }

  return (
    <header className="full">
      <BurgerMenu />

      {/* trigger the search bar animation */}
      <button className="search-trigger" onClick={searchTrigger}>
        <svg width="256px" height="256px" viewBox="0 0 20.00 20.00" fill="white"><path d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z"></path></svg>
      </button>

      {/* LOGO */}
      <NavLink to="/">
        <div className="logo-div">
          <button className="logo">
          s<span className="blue">.</span>t<span className="green">. </span>
           H</button>
           <img className="logo" src={Logo} alt="ST Hospital Logo" />
          <button className="logo">spital</button>
        </div>
      </NavLink>

      {/* only to facilitate development */}
      <nav className="test-navbar">
        <ul>
          <li><NavLink to="/">{strings.navbar.links.home}</NavLink></li>
          <li><NavLink to="/departments">{strings.navbar.links.departments}</NavLink></li>
          <li><NavLink to="/gpractice">{strings.navbar.links.gpractice}</NavLink></li>
          {!user && <li><NavLink to="/signup">{strings.navbar.links.signup}</NavLink></li>}
          {!user && <li><NavLink to="/login">{strings.navbar.links.login}</NavLink></li>}
          {user && <li><NavLink to="/account">{strings.navbar.links.account}</NavLink></li>}
          {user && <li><button className="back" onClick={logOutUser}>Logout</button></li>}
          {/* {user && <li > <span className="capitalize">{user.username}</span> ({user.role})</li>} */}

        </ul>
      </nav>


      {/* what appear when you click on the menu icon */}
      <div className="circle-menu" onClick={animate}>
        <nav className="navbar">
          <ul className="navbar-ul">
            {user && <li className="user-infos"><h3>{strings.navbar.links.welcome} {user.role} <span className="capitalize">{user.username}</span></h3></li>}

            <li><NavLink to="/"><h3 className="neonText">{strings.navbar.links.home}</h3></NavLink></li>

            <li><NavLink to="/departments"><h3 className="neonText">{strings.navbar.links.departments}</h3></NavLink></li>

            <li><NavLink to="/gpractice"><h3 className="neonText">{strings.navbar.links.gpractice}</h3></NavLink></li>

            {!user && <li><NavLink to="/signup"><h3 className="neonText">{strings.navbar.links.signup}</h3></NavLink></li>}

            {!user && <li><NavLink to="/login"><h3 className="neonText">{strings.navbar.links.login}</h3></NavLink></li>}

            {user && <li><NavLink to="/account"><h3 className="neonText">{strings.navbar.links.account}</h3></NavLink></li>}

            {user && <li><button className="logout" onClick={logOutUser}><h3 className="neonText">Logout</h3></button></li>}
          </ul>
        </nav>
      </div>

      {/* <!-- Languages button --> */}
      <div className="containerToggle lang">
        <button id="languageBtn" onClick={changeLanguage}>{lang}</button>
      </div>

    </header>
  )
}

export default Navbar
