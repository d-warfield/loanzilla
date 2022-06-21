import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Home from "views/Home";
import Borrow from "views/Borrow";
import Lend from "views/Lend";
import Asset from "views/Asset";
import Dashboard from "views/Dashboard";
import DummyHome from "views/DummyHome";
import { useStateValue } from "./context";
import { Moralis } from "moralis";
import Header from "components/Header";
import Footer from "components/Footer";
import { isBrowser } from "react-device-detect";

const { REACT_APP_MORALIS_STAGE } = process.env;

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        )
      }
    />
  );
};

function App() {
  const [{ userAddress }, dispatch] = useStateValue();

  useEffect(() => {
    if (userAddress !== "") {
      (async () => {
        const options = {
          chain: REACT_APP_MORALIS_STAGE,
          address: userAddress,
        };

        const currencies = await Moralis.Web3API.account.getTokenBalances(
          options
        );

        const tokens = await Moralis.Web3API.account.getNFTs(options);

        dispatch({
          type: "SET_CURRENCIES",
          payload: currencies,
        });

        dispatch({
          type: "SET_TOKENS",
          payload: tokens.result,
        });
      })();
    }
  }, [userAddress]);

  return (
    <Router>
      {isBrowser && <Header />}
      <Switch>
        <Route
          exact
          path="/"
          component={isBrowser ? () => <Home /> : () => <DummyHome />}
        />

        <Route exact path="/asset/:contract/:id" component={Asset} />
        <Route exact path="/lend" component={Lend} />
        <Route exact path="/borrow" component={Borrow} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
