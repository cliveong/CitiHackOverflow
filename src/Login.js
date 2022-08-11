import React, { useState, useContext } from "react";
import { Context } from "./Context";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Button, ButtonGroup } from "reactstrap";
import "./login.css";

export default function () {
  const [user, setUser] = useContext(Context);
  const [clientBtn, setClientBtn] = useState(true);
  const [employeesBtn, setEsmployeesBtn] = useState(false);
  return (
    <div>
      <form className="loginForm">
        <div className="wrapper">
          <div className="title">
            <text>Investr</text>
          </div>
          <>
            <ButtonGroup className="my-2" size="sm" style={{ width: "300px" }}>
              <Button
                outline
                className="loginClientBtn"
                style={{ width: "150px" }}
                onClick={() => {
                  setClientBtn(true);
                  setEsmployeesBtn(false);
                }}
                active={clientBtn}
              >
                Client
              </Button>
              <Button
                outline
                className="loginEmpBtn"
                style={{ width: "150px" }}
                onClick={() => {
                  setClientBtn(false);
                  setEsmployeesBtn(true);
                }}
                active={employeesBtn}
              >
                Employees
              </Button>
            </ButtonGroup>
            <br />
          </>
          <div className="inputs">
            <input type="text" placeholder=" Username" />

            <input type="password" placeholder=" ******" />
          </div>
          <div className="flexRow">
            <label>
              Remember me
              <input type="checkbox"></input>
            </label>

            <Button className="Forget">Forgot Username/Password</Button>
          </div>
          <Link
            to="/performance"
            onClick={() => (clientBtn ? setUser("client") : setUser("banker"))}
          >
            <Button className="Login">Login</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
