import { Routes, Route } from "react-router-dom"

/* Components */
import Navbar from "./components/Navbar"

/* Pages */
import HomePage from "./pages/HomePage"

import SignUp from "./pages/auth/SignUp"
import LogIn from "./pages/auth/LogIn"
import Account from "./pages/auth/Account"
import EditAccount from "./pages/auth/EditAccount"
import AdminPage from "./pages/admins/AdminPage"
import NotFound from "./pages/error/NotFound"
import Error from "./pages/error/Error"
import IsPrivate from "./components/isPrivate"
import IsAnon from "./components/IsAnon"
import IsAdmin from "./components/IsAdmin"


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/*   HomePage  */}
        <Route path="/" element={<HomePage />} />

        {/* Auth Pages */}
        <Route path="/signup" element={<IsAnon><SignUp /></IsAnon>} />
        <Route path="/login" element={<IsAnon><LogIn /></IsAnon>} />
        <Route path="/account" element={<IsPrivate><Account /></IsPrivate>} />
        <Route path="/editaccount" element={<IsPrivate><EditAccount /></IsPrivate>} />
        
        {/*Admin Pages */}
        <Route path="/admin" element={<IsAdmin><AdminPage /></IsAdmin>} />

        {/* Error Pages */}
        <Route path="/500" element={<Error />} />
        <Route path="*" element={<NotFound />} />



      </Routes>
    </>
  )
}

export default App
