import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { BoardProvider } from "./context/BoardProvider";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BoardProvider>
        <App />
      </BoardProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
