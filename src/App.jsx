import { Routes, Route } from "react-router-dom";

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
// import SingleDoctor from "./components/SingleDoctor";

function App() {
  return (
    <>
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
          <Route path="/doctor/:id" element={<SingleDoctor />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
