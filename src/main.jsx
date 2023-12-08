import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";

/* Auth Context */
import { AuthProviderWrapper } from "./context/auth.context.jsx";

/* JSON Context */
import { LanguageWrapper } from "./context/language.context.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <LanguageWrapper>
        <AuthProviderWrapper>
          <App />
        </AuthProviderWrapper>
      </LanguageWrapper>
    </Router>
  </React.StrictMode>
);
