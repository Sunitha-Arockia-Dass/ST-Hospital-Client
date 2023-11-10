import { Routes, Route } from "react-router-dom"

/* Components */
import Navbar from "./components/Navbar"

/* Pages */
import HomePage from "./pages/HomePage"

import SignUp from "./pages/auth/SignUp"
import LogIn from "./pages/auth/LogIn"
import Account from "./pages/auth/Account"
import EditAccount from "./pages/auth/EditAccount"

import NotFound from "./pages/error/NotFound"
import Error from "./pages/error/Error"


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/*   HomePage  */}
        <Route path="/" element={<HomePage />} />

        {/* Auth Pages */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/account" element={<Account />} />
        <Route path="/editaccount" element={<EditAccount />} />

        {/* Error Pages */}
        <Route path="/500" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
