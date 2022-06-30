import { Global } from "@emotion/react";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/auth-context";
import { global, reset } from "./styles";

ReactDOM.render(
  <React.StrictMode>
    <Global styles={reset} />
    <Global styles={global} />
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
