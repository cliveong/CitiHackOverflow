import React, { useState } from 'react';
import Select from 'react-select';
import { Button, ButtonGroup } from 'reactstrap';
import PortfolioNav from "./PortfolioNav";
import "./login.css";

export default function Login() {
    return (

        <form className='loginForm'>
            <div className='wrapper'>
            <>
                <ButtonGroup className="my-2" size="sm">
                    <Button outline active>
                    Client
                    </Button>
                    <Button outline>
                    Employees
                    </Button>
                </ButtonGroup>
                <br />
            </>

            <div className='inputs'>
                <label>
                    Username:
                </label>
                <input type="text"/>

                <label>
                    Password:
                </label>
                <input type="password"/>
            </div>

            <Button className="Login">
                Login
            </Button>

            <Button className="Forget">
                Forget Username/Password?
            </Button>
            </div>
        </form>
    );
}
