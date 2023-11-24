import { NavLink, useNavigate } from "react-router-dom"
import BurgerMenu from "./BurgerMenu"

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

  return (
    <header className="full">
      <BurgerMenu />
      <button className="logo">S.T. Hospital</button>

      <div className="test-navbar">
        <ul>
          {user && <li className="user-infos">{strings.navbar.links.welcome} <span className="capitalize">{user.username}</span> ({user.role})</li>}
          
          <li><NavLink to="/">{strings.navbar.links.home}</NavLink></li>

          <li><NavLink to="/departments">{strings.navbar.links.departments}</NavLink></li>

          {!user && <li><NavLink to="/signup">{strings.navbar.links.signup}</NavLink></li>}

          {!user && <li><NavLink to="/login">{strings.navbar.links.login}</NavLink></li>}

          {user && <li><NavLink to="/account">{strings.navbar.links.account}</NavLink></li>}

        

          {user && <li><NavLink to="/gpractice">{strings.navbar.links.gpractice}</NavLink></li>}

          

          {user && user.role === "admin" && <li><NavLink to="/admin">Admin Page</NavLink></li>}

          {user && <li><button onClick={logOutUser}>Logout</button></li>}
        </ul>
      </div>
      

      <div className="circle-menu" onClick={animate}>
      <nav className="navbar">
        <ul>
          {user && <li className="user-infos"><h3>{strings.navbar.links.welcome} <span className="capitalize">{user.username}</span> ({user.role})</h3></li>}
          
          <li><NavLink to="/"><h3 className="neonText">{strings.navbar.links.home}</h3></NavLink></li>

          <li><NavLink to="/departments"><h3 className="neonText">{strings.navbar.links.departments}</h3></NavLink></li>

          {!user && <li><NavLink to="/signup"><h3  className="neonText">{strings.navbar.links.signup}</h3></NavLink></li>}

          {!user && <li><NavLink to="/login"><h3  className="neonText">{strings.navbar.links.login}</h3></NavLink></li>}

          {user && <li><NavLink to="/account"><h3  className="neonText">{strings.navbar.links.account}</h3></NavLink></li>}

          {user && <li><NavLink to="/account">{strings.navbar.links.account}</NavLink></li>}


          {user && <li><NavLink to="/gpractice"><h3 className="neonText">{strings.navbar.links.gpractice}</h3></NavLink></li>}

          

          {user && user.role === "admin" && <li><NavLink to="/admin"><h3  className="neonText">Admin Page</h3></NavLink></li>}

          {user && <li><button className="logout" onClick={logOutUser}><h3 className="neonText">Logout</h3></button></li>}
        </ul>
      </nav>
      </div>

      <div className="containerToggle lang">
        {/* <!-- Languages button --> */}
        <button id="languageBtn" onClick={changeLanguage}>{lang}</button>
      </div>   

    </header>
  )
}

export default Navbar
