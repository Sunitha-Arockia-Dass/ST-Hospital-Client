import { NavLink } from "react-router-dom"

/*Languages context*/
import { useContext } from 'react'
import { LanguageContext } from '../context/language.context'


function Navbar() {
    const { lang, strings, setLang } = useContext(LanguageContext)

    function changeLanguage() {
        // return french if it's english and vice versa
        setLang(lang => {
            return lang == "EN" ? "FR" : "EN"
        })
    }

    return (
        <header>
            <nav className="navbar">
                <ul>
                    <NavLink to="/">{strings.navbar.links.home}</NavLink>

                    <NavLink to="/signup">{strings.navbar.links.signup}</NavLink>

                    <NavLink to="/login">{strings.navbar.links.login}</NavLink>

                    <NavLink to="/account">{strings.navbar.links.account}</NavLink>

                    <NavLink to="/editaccount">{strings.navbar.links.editaccount}</NavLink>
                </ul>
            </nav>

            <div className="containerToggle lang">
                {/* <!-- DarkMode Toggling button --> */}
                <button id="languageBtn" onClick={changeLanguage}>{lang}</button>
            </div>
        </header>
    )
}

export default Navbar