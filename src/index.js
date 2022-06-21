import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "context";
import { MoralisProvider } from "react-moralis";
const {
  REACT_APP_MORALIS_APP_ID: moralisAppId,
  REACT_APP_MORALIS_SERVER_URL: moralisServerUrl,
} = process.env;

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={moralisAppId} serverUrl={moralisServerUrl}>
      <ContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContextProvider>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
