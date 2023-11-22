/*Languages context*/
import { useContext } from 'react'
import { LanguageContext } from '../context/language.context'

function HomePage() {
    const { lang, strings, setLang } = useContext(LanguageContext)

    return (
        <div className="home-page">

            <h1>Sunitha</h1>
            <h1>Thomas</h1>
            <h1>Hospital</h1>
            <h2>More than Health !</h2>
            <h2>We give you well-being</h2>
            <button className="scroll-btn">
                <h4>Scroll</h4>
                <div className="scroll-down2"></div>
            </button>
        </div>
    )
}

export default HomePage