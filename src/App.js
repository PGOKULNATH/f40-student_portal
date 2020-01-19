import React from "react";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";
import UserState from "./context/user/UserState";
import AlertState from "./context/alert/AlertState";
import DataState from "./context/data/dataState";
import "./index.css";
import "./custom.css";

const App = () => {
  return (
    <UserState>
      <AlertState>
        <DataState>
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        </DataState>
      </AlertState>
    </UserState>
  );
};

export default App;
