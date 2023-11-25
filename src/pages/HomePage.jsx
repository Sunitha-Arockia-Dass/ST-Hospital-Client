/*Languages context*/
import { useContext, useLayoutEffect, useRef } from 'react'
import { LanguageContext } from '../context/language.context'
import { gsap } from "gsap/dist/gsap";

function HomePage() {
    const { lang, strings, setLang } = useContext(LanguageContext)

    // home-page Gsap Animation //////////////////////////////////////////
    const hp = useRef(null);

    useLayoutEffect(() => {

        let ctx = gsap.context(() => {
            const tlHomePage = gsap.timeline({ defaults: { duration: .3, ease: "power1.out" } })
            // tlHomePage
            //     .fromTo("#home-page h1", { x: "-100", opacity: 0 }, { x: "0", opacity: 1, stagger: 0.2, delay: 1 })
            //     .fromTo("#home-page h2", { x: "100", opacity: 0 }, { x: "0", opacity: 1, stagger: 0.2, delay: .2 })
            //     .fromTo("#home-page button", { y: "150", opacity: 0 }, { y: "0", opacity: 1 })


        }, hp);
        return () => ctx.revert();

    }, [])

    return (
        <div id="home-page" className='center-frame breakout' ref={hp}>
            <div className='half-frame'>
                <h1 className='my-text'>Sunitha</h1>
                <h1>Thomas</h1>
                <h1>Hospital</h1>
                <h2>More than Health !</h2>
                <h2>We give you well-being</h2>
                <button className="scroll-btn">
                    <h4>Scroll</h4>
                    <div className="scroll-down2"></div>
                </button>
            </div>

            <div className='half-frame'></div>

        </div>
    )
}

export default HomePage