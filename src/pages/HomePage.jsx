/*Languages context*/
import { useContext } from 'react'
import { LanguageContext } from '../context/language.context'

function testPage() {
    const { lang, strings, setLang } = useContext(LanguageContext)

    return (
        <div className="testpage">
            <h1>{strings.homepage.headings}</h1>
            <div className="test one">{strings.homepage.div.test}</div>
            <div className="test two">{strings.homepage.div.test}</div>
            <div className="test three">{strings.homepage.div.test}</div>

            <div className="test four">{strings.homepage.div.test}</div>
            <div className="test five">{strings.homepage.div.test}</div>
            <div className="test six">{strings.homepage.div.test}</div>

            <div className="test eleven">{strings.homepage.div.test}</div>
            <div className="test twelve">{strings.homepage.div.test}</div>
            <div className="test thirteen">{strings.homepage.div.test}</div>  
            
            <div className="test">{strings.homepage.div.test}</div> 
            <div className="test seven">{strings.homepage.div.test}</div>
            <div className="test">{strings.homepage.div.test}</div> 

            <div className="test">{strings.homepage.div.test}</div>           
            <div className="test height">{strings.homepage.div.test}</div>
            <div className="test">{strings.homepage.div.test}</div>

            <div className="test">{strings.homepage.div.test}</div>  
            <div className="test nine">{strings.homepage.div.test}</div>
            <div className="test">{strings.homepage.div.test}</div> 

            <div className="test">{strings.homepage.div.test}</div> 
            <div className="test ten">{strings.homepage.div.test}</div>
            <div className="test">{strings.homepage.div.test}</div> 

        </div>
    )
}

export default testPage