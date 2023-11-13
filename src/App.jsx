import { Routes, Route } from "react-router-dom";

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

import DepartmentPage from "./pages/DepartmentPage";

/* error Pages */
import NotFound from "./pages/error/NotFound";
import Error from "./pages/error/Error";



function App() {
  return (
    <>
      <Navbar />

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
    </>
  );
}

export default App;
