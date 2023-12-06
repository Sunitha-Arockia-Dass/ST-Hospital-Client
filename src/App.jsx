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

gsap.registerPlugin(
  Flip,
  ScrollTrigger,
  Observer,
  ScrollToPlugin,
  Draggable,
  MotionPathPlugin,
  EaselPlugin,
  PixiPlugin,
  TextPlugin,
  RoughEase,
  ExpoScaleEase,
  SlowMo,
  CustomEase
);

/* Components */
import Navbar from "./components/Navbar";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import IsAdmin from "./components/IsAdmin";
import SingleDept from "./components/SingleDept";
import SingleDoctor from "./components/SingleDoctor";

/* Pages */
import HomePage from "./pages/HomePage";

import SignUp from "./pages/auth/SignUp";
import LogIn from "./pages/auth/LogIn";
import Account from "./pages/auth/Account";
import EditAccount from "./pages/auth/EditAccount";
import AdminPage from "./pages/admins/AdminPage";
import GPractice from "./pages/GPractice";
import DepartmentPage from "./pages/DepartmentPage";

/* error Pages */
import NotFound from "./pages/error/NotFound";
import Error from "./pages/error/Error";
import SearchBar from "./components/SearchBar";
// import SingleDoctor from "./components/SingleDoctor"

function App() {
  const app = useRef(null);





  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      //cursor animation 
      gsap.set(".pill-cursor", { xPercent: 75, yPercent: 75 });

      let xTo = gsap.quickTo(".pill-cursor", "x", { duration: 0.6, ease: "power4.out" }),
        yTo = gsap.quickTo(".pill-cursor", "y", { duration: 0.6, ease: "power4.out" });

      window.addEventListener("mousemove", e => {
        xTo(e.clientX);
        yTo(e.clientY);
      });

      // hamburger-menu Gsap Animation //////////////////////////////////////////
      let hamburgerMenu = document.querySelector(".hamburger-menu");
      let circleMenu = document.querySelector(".circle-menu");

      // Click
      const tlHamburgerClick = gsap.timeline({
        defaults: { duration: 0.3, ease: "power4.out" },
      });
      const closeMenu = () => {
        tlHamburgerClick.timeScale(3);
        tlHamburgerClick.reverse();
      };

      tlHamburgerClick
        .paused(true)
        .reversed(true)
        .to(".circle-menu", {
          display: "block",
          backgroundColor: "var(--foreground)",
          top: 0,
          left: 0,
          duration: 0.5,
          height: " 100vh",
          width: "100vw",
          borderRadius: 0,
        })
        .fromTo(".navbar", { display: "none" }, { display: "block" })
        .from(".navbar-ul", {
          opacity: "0",
          stagger: 0.5,
          ease: "bounce.out",
          delay: 0.5,
          repeat: 2,
          yoyo: true,
        });

      hamburgerMenu.addEventListener("click", () =>
        tlHamburgerClick.reversed() ? tlHamburgerClick.play() : closeMenu()
      );
      circleMenu.addEventListener("click", () => {
        tlHamburgerClick.timeScale(5);
        tlHamburgerClick.reverse();
      });
    }, app);
    return () => ctx.revert();
  }, []);

  return (
    <div className="useLayoutGsap" ref={app}>
      <div className="pill-cursor">
      <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="10" stroke="#ffffff" stroke-width="1.5"></circle> <path d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M16 10.5C16 11.3284 15.5523 12 15 12C14.4477 12 14 11.3284 14 10.5C14 9.67157 14.4477 9 15 9C15.5523 9 16 9.67157 16 10.5Z"></path> <ellipse cx="9" cy="10.5" rx="1" ry="1.5"></ellipse> </g></svg>
        </div>
      <Navbar />
      <main className="container full">
        <SearchBar />
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
          <Route path="/gpractice" element={<GPractice />} />

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
          <Route path="/departments/:id" element={<SingleDept />} />

          {/*Doctor  Page*/}
          <Route
            path="/doctor/:id"
            element={
              <IsPrivate>
                <SingleDoctor />
              </IsPrivate>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
