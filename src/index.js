import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./web.config"
import { AuthProvider } from "./context/AuthProvider";
import { StoreProvider } from "./context/StoreProvider";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
