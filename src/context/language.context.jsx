import { createContext, useEffect, useState } from "react"
import stringsJson from './../languages/languages.json'

const LanguageContext = createContext()

function LanguageWrapper(props) {

    const [lang, setLang] = useState("EN")
    const [strings, setStrings] = useState(stringsJson[lang])

    useEffect(() => {
        setStrings(stringsJson[lang])
    }, [lang])

    return (

        <LanguageContext.Provider value={{
            lang, strings, setLang
        }}>

            {props.children}
        </LanguageContext.Provider>

    )

}

export { LanguageContext, LanguageWrapper }

