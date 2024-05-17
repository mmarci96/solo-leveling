import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GlobalContextProvider } from "./context/global.jsx";
import Navbar from "./components/nav/Navbar.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <Navbar />
      <App />
    </GlobalContextProvider>
  </React.StrictMode>,
);
