import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ScrollToTop from "./components/scrollToTop";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./contexts/authContext";
import DataProvider from "./contexts/dataContext";

// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
