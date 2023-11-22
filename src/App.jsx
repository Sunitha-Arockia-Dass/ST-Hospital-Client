import { Routes, Route } from "react-router-dom";
import { useRef, useLayoutEffect } from "react";

/* Gsap */
import { gsap } from "gsap/dist/gsap";

import { CustomEase } from "gsap/dist/CustomEase";
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/dist/EasePack";

import { Flip } from "gsap/dist/Flip";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Observer } from "gsap/dist/Observer";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { Draggable } from "gsap/dist/Draggable";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
import { EaselPlugin } from "gsap/dist/EaselPlugin";
import { PixiPlugin } from "gsap/dist/PixiPlugin";
import { TextPlugin } from "gsap/dist/TextPlugin";


gsap.registerPlugin(Flip, ScrollTrigger, Observer, ScrollToPlugin, Draggable, MotionPathPlugin, EaselPlugin, PixiPlugin, TextPlugin, RoughEase, ExpoScaleEase, SlowMo, CustomEase);

/* Components */
import Navbar from "./components/Navbar";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import IsAdmin from "./components/IsAdmin";

/* Pages */
import HomePage from "./pages/HomePage";

import SignUp from "./pages/auth/SignUp";
import LogIn from "./pages/auth/LogIn";
import Account from "./pages/auth/Account";
import EditAccount from "./pages/auth/EditAccount";
import AdminPage from "./pages/admins/AdminPage";
import GPractice from "./pages/GPractice"
import DepartmentPage from "./pages/DepartmentPage";

/* error Pages */
import NotFound from "./pages/error/NotFound";
import Error from "./pages/error/Error";



function App() {
  const app = useRef(null);

  useLayoutEffect(() => {

    let ctx = gsap.context(() => {
      // hamburger-menu
      let hamburgerMenu = document.querySelector(".hamburger-menu")

      hamburgerMenu.addEventListener("click", () => {
        const currentState = hamburgerMenu.getAttribute("data-state")
    
        if (!currentState || currentState === "closed") {
          hamburgerMenu.setAttribute("data-state", "opened")
          hamburgerMenu.setAttribute("aria-expanded", "true")
        } else {
          hamburgerMenu.setAttribute("data-state", "closed")
          hamburgerMenu.setAttribute("aria-expanded", "false")
        }
      })

      let circleMenu = document.querySelector(".circle-menu")

      // Click
      const tlHamburgerClick = gsap.timeline({ defaults: { duration: .3, ease: "power4.out" } })
      const closeMenu = () => {
        tlHamburgerClick.timeScale(3)
        tlHamburgerClick.reverse()
      }

      tlHamburgerClick.paused(true).reversed(true)
        .to(".circle-menu", { display: "block", backgroundColor: "var(--foreground)",  top: 0, left: 0, duration: .5, height: " 100vh", width: "100vw", borderRadius: 0 })
        .fromTo(".navbar", {display: "none"}, {display: "block"})
        .from("ul", { opacity: "0", stagger: .5, ease:"bounce.out", delay: .5, repeat: 2, yoyo: true })

      hamburgerMenu.addEventListener("click", () => tlHamburgerClick.reversed() ? tlHamburgerClick.play() : closeMenu())
      circleMenu.addEventListener("click", () => {tlHamburgerClick.timeScale(5); tlHamburgerClick.reverse()})

    }, app);

    return () => ctx.revert();

  }, [])


  return (
    <div className="useLayoutGsap container" ref={app}>
      <Navbar />
      <main className="container full">
        <Routes>


          {/*   HomePage  */}
          <Route path="/" element={<HomePage />} />

        {/* Auth Pages */}
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignUp />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LogIn />
            </IsAnon>
          }
        />
        <Route
          path="/account"
          element={
            <IsPrivate>
              <Account />
            </IsPrivate>
          }
        />
        <Route
          path="/editaccount"
          element={
            <IsPrivate>
              <EditAccount />
            </IsPrivate>
          }
        />
        <Route
          path="/gpractice"
          element={
            
              <GPractice />
            
          }
        />

          {/* Error Pages */}
          <Route path="/500" element={<Error />} />
          <Route path="*" element={<NotFound />} />

          {/*Admin Pages */}
          <Route
            path="/admin"
            element={
              <IsAdmin>
                <AdminPage />
              </IsAdmin>
            }
          />
          {/*Department List Page */}
          <Route path="/departments" element={<DepartmentPage />} />

        </Routes>
      </main>
    </div>
  );
}

export default App;
