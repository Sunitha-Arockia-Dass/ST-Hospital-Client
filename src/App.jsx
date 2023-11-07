import { Routes, Route } from "react-router-dom"

/* Components */
import Navbar from "./components/Navbar"

/* Pages */
import HomePage from "./pages/HomePage"

import SignUp from "./pages/auth/SignUp"
import LogIn from "./pages/auth/LogIn"

import NotFound from "./pages/error/NotFound"
import Error from "./pages/error/Error"


function App() {

  return (
    <>
        <Navbar />

      <Routes>
        {/*   Add <Route /> components between <Routes> and </Routes>   */}
        <Route path="/" element={<HomePage />} />

        {/* Auth Pages */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />

        {/* Error Pages */}
        <Route path="/500" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
