import React, { useState, useContext } from 'react';
import { Context } from "./Context";
import { Link } from "react-router-dom";
import Select from 'react-select';
import { Button, ButtonGroup } from 'reactstrap';
import PortfolioNav from "./PortfolioNav";
import "./login.css";

export default function() {
    const [user, setUser] = useContext(Context);
    const [clientBtn, setClientBtn] = useState(true);
    const [employeesBtn, setEsmployeesBtn] = useState(false);
    return (
        <div>
        <Link to="/performance" onClick={() => setUser("banker")}>
            <button> Banker</button>
        </Link>
        <Link to="/performance" onClick={() => setUser("client")}>
            <button> Client</button>
        </Link>
        <form className='loginForm'>
            <div className='wrapper'>
            <>
                <ButtonGroup className="my-2" size="sm" style={{width:"300px"}}>
                    <Button outline 
                    className="loginClientBtn"
                    style={{width:"150px"}}
                    onClick={() => {setClientBtn(!clientBtn); setEsmployeesBtn(!employeesBtn)}}
                    active={clientBtn}>
                    Client
                    </Button>
                    <Button outline
                    className="loginEmpBtn"
                    style={{width:"150px"}}
                    onClick={() => {setClientBtn(!clientBtn); setEsmployeesBtn(!employeesBtn)}}
                    active={employeesBtn}>
                    Employees
                    </Button>
                </ButtonGroup>
                <br />
            </>

            <div className='inputs'>
                <input type="text" placeholder=' Username'/>

                <input type="password" placeholder=" ******"/>
            </div>
            <div className='flexRow'>
                <label>
                    Remember me
                    <input type="checkbox">
                    </input>
                </label>

                <Button className="Forget">
                    Forgot Username/Password
                </Button>
            </div>

            <Button className="Login">
                Login
            </Button>

            </div>
        </form>
        </div>
    );
}
