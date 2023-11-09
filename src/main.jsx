import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import "./index.css"
import App from "./App"

/* JSON Data */
import { LanguageWrapper } from './context/language.context.jsx'

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <React.StrictMode>
    <LanguageWrapper>
      <Router>
        <App />
      </Router>
    </LanguageWrapper>
  </React.StrictMode>
)
