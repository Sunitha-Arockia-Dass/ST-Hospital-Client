import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import "./index.css"
import App from "./App"
import { AuthProviderWrapper } from "./context/auth.context"; 


/* JSON Data */
import { LanguageWrapper } from './context/language.context.jsx'

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <React.StrictMode>
    <LanguageWrapper>
      <Router>
      <AuthProviderWrapper>     
        <App />
      </AuthProviderWrapper>      </Router>
    </LanguageWrapper>
  </React.StrictMode>
)
