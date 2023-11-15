/*Languages context*/
import { useContext } from 'react'
import { LanguageContext } from '../context/language.context'

function HomePage() {
    const { lang, strings, setLang } = useContext(LanguageContext)

    return (
        <div className="home-page">
        <h1>Did you take a me time ?! :D </h1>
        <button>YES</button>
        <button disabled>NO</button>
        <br/>
        no is not an option ^^
            
        </div>
    )
}

export default HomePage