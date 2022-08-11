/* @flow */

import "./App.css";
import * as React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Navbar from "./Navbar";
import SpinKit from "./SpinKit";
import { fetchAllQuotes } from "./actions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { Context } from "./Context";

// const Overview = React.lazy(() => import("./Overview"));
const Performance = React.lazy(() => import("./Performance"));
const Stock = React.lazy(() => import("./Stock"));
const Transactions = React.lazy(() => import("./Transactions"));
const RiskAssessment = React.lazy(() => import("./RiskAssessment"));
const Recommendations = React.lazy(() => import("./Recommendations"));
const Login = React.lazy(() => import("./Login"));
const StockSelection = React.lazy(() => import("./StockSelection"));

function LoadingIndicator() {
  return (
    <div className="container my-3">
      <div className="d-flex align-items-center">
        <SpinKit className="mr-2" type="folding-cube" />
        Loading…
      </div>
    </div>
  );
}

export default function App(): React.Node {
  const [user, setUser] = useState(false);
  const [data, setData] = useState([{index: 1, ticker: "GME", risk:"High", date:"11/8/22", comment:"Do not buy"}]);
  const dispatch = useDispatch<Dispatch>();
  React.useEffect(() => {
    dispatch(fetchAllQuotes());
  }, [dispatch]);
  // const [value, setValue] = useState("");

  // axios.post("http://localhost:5001/sentiment", {"sentence": value})
  //     .then((response) => {
  //       console.log(response);
  //     })
  return (
    <Context.Provider value={[user,setUser,data, setData]}>
      <Router>
        <div>
          {/* Wrap the `Navbar` in a pathless route to ensure it is always rendered and always updates
              on navigation. Updates are blocked because internally the `Navbar` is wrapped by
              react-redux's `connect`.

              See: React Router's ["Dealing With Update Blocking"][0] */}
          {/* <Route component={Navbar} /> */}
          <React.Suspense fallback={<LoadingIndicator />}>
            <Route exact path="/" component={Login} />
            <Route path="/performance" render={() => <><Navbar/><Performance /></>} />
            <Route path="/stocks/:symbol" component={Stock} />
            <Route path="/transactions" render={() => <><Navbar/><Transactions /></>} />
            <Route path="/riskassessment" render={() => <><Navbar/><RiskAssessment /></>} />
            <Route path="/recommendations" render={() => <><Navbar/><Recommendations /></>} />
            <Route path="/stockSelection" render={() => <><Navbar/><StockSelection /></>} />
            
            {/* <Route path="/performance" component={Performance}/>
            <Route path="/stocks/:symbol" component={Stock}/>
            <Route path="/transactions" component={Transactions} />
            <Route path="/riskassessment" component={RiskAssessment} />
            <Route path="/recommendations" component={Recommendations} />
            <Route path="/stockSelection" component={StockSelection}/> */}
          </React.Suspense>
          <footer className="bg-light py-4">
            <Container>
              <Row>
                <Col>
                  <small className="text-secondary">
                    Created by AlphaLab
                  </small>
                </Col>
              </Row>
              <Row>
                <Col>
                  <small className="text-secondary">
                    Data provided by{" "}
                    <a className="link-secondary" href="https://iexcloud.io">
                      IEX Cloud
                    </a>
                  </small>
                </Col>
              </Row>
            </Container>
          </footer>
        </div>
      </Router>
    </Context.Provider>
  );
}

// [0]: https://github.com/ReactTraining/react-router/blob/4b61484ec9eea4bc3a2eb36028c47934414542ae/packages/react-router/docs/guides/blocked-updates.md
