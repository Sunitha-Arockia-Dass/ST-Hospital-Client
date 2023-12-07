/*Languages context*/
import { useContext, useLayoutEffect, useRef } from 'react'
import { LanguageContext } from '../context/language.context'
import { gsap } from "gsap/dist/gsap"

function HomePage() {
    const { lang, strings, setLang } = useContext(LanguageContext)

    // home-page Gsap Animation //////////////////////////////////////////
    const hp = useRef(null)

    useLayoutEffect(() => {
        document.addEventListener("mousemove", parallax);
        function parallax(e){
            document.querySelectorAll(".object").forEach(function (move) {

                var moving_value = move.getAttribute("data-value");
                var x = (e.clientX * moving_value) / 250;
                var y = (e.clientY * moving_value) / 250;

                move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
            })}


        let ctx = gsap.context(() => {
            const tlHomePage = gsap.timeline({ defaults: { duration: .3, ease: "power1.out" } })
            tlHomePage
                .fromTo("#home-page h1", { x: "-100", opacity: 0 }, { x: "0", opacity: 1, stagger: 0.2, delay: 1 })
                .fromTo("#home-page h2", { x: "100", opacity: 0 }, { x: "0", opacity: 1, stagger: 0.2, delay: .2 })
                .fromTo("#home-page button", { y: "150", opacity: 0 }, { y: "0", opacity: 1 })
                .fromTo(".wheel-w", { x: "100", opacity: 0 }, { x: "0", opacity: 1, stagger: 0.05, delay: .2 })
                .fromTo(".contact-box", { opacity: 0, y: 100 }, { opacity: 1, y: 0, ease: "bounce", duration: 2}, "<")
        }, hp)
        return () => ctx.revert()

        
    }, [])

    return (
        <div id="home-page" className="breakout" ref={hp}>
            <div className='center-frame'>
                <div className="half-frame object" data-value="2">
                    <h1 className='my-text'><span className='green'>S</span><span className='blue'>unitha</span></h1>
                    <h1><span className='green'>T</span><span className='blue'>homas</span></h1>
                    <h1>Hospital</h1>
                    <h2>More than Health !</h2>
                    <h2>We give you well-being</h2>
                    {/* <button className="scroll-btn">
                        <h4>Scroll</h4>
                        <div className="scroll-down2"></div>
                    </button> */}
                </div>

                <div className="half-frame object" data-value="-2">
                    <div className='circles'>
                        <img className="wheel-w img1 object" data-value="-0.5" src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/orthopaedic.svg" height="100px" width="100px" />
                        <img className="wheel-w img2 object" data-value="1.4" src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/cardiology_icon.svg" height="100px" width="100px" />
                        <img className="wheel-w img3 object" data-value="0.7" src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/paediatricurology.svg" height="100px" width="100px" />

                        <img className="wheel-w img4 object" data-value="1.1" src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/gynecology.svg" height="100px" width="100px" />
                        <img className="wheel-w img5 object" data-value="-0.8" src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/radiology.svg" height="100px" width="100px" />
                        <img className="wheel-w img6 object" data-value="-1.2" src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/neonatology.svg" height="100px" width="100px" />

                        <img className="wheel-w img7 object" data-value="-1.6" src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/oncology_icon.svg" height="100px" width="100px" />
                        <img className="wheel-w img8 object" data-value="-0.6" src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/neurology.svg" height="100px" width="100px" />
                        <img className="wheel-w img9 object" data-value="-1.4" src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/dermatology.svg" height="100px" width="100px" />

                        <img className="wheel-w img10 object" data-value="0.2" src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/endocrinology.svg" height="100px" width="100px" />
                        <img className="wheel-w img11 object" data-value="-1.3" src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/gastroenterology.svg" height="100px" width="100px" />
                        <img className="wheel-w img12 object" data-value="-1.5" src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/urology.svg" height="100px" width="100px" />

                        <img className="wheel-w img13 object" data-value="1.2" src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/plasticsurgery.svg" height="100px" width="100px" />
                        <img className="wheel-w img14 object" data-value="1" src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/pulmonology.svg" height="100px" width="100px" />
                        <img className="wheel-w img15 object" data-value="1.3" src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/ophthalmology.svg" height="100px" width="100px" />

                        <img className="wheel-w img16 object" data-value="1.9" src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/psychiatry.svg" height="100px" width="100px" />
                        <img className="wheel-w img17 object" data-value="-1.4" src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/dentistry.svg" height="100px" width="100px" />
                        <img className="wheel-w img18 object" data-value="1.5" src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/orthopaedic.svg" height="100px" width="100px" />

                        <img className="wheel-w img19 object" data-value="0.9" src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/nephrology.svg" height="100px" width="100px" />
                        <img className="wheel-w img20 object" data-value="-0.6" src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/ent.svg" height="100px" width="100px" />
                    </div>
                </div>

            </div>

            <div className='center-frame'>
               
                
            </div>

            <div className="contact-box gradient-bg">
                <h5>Contact:</h5>
                <br/>
                <p>🕿 0945454545</p>
                <br/>
                <p>ST Hospital<br/>
                Paradise Island<br/>
                Just where it should be<br/>
                08018 ThisTown
                </p>
            </div>


        </div>
    )
}

export default HomePage