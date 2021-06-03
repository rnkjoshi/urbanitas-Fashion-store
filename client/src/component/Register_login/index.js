import React from 'react';
import MyButton from '../utils/button';
import Login from './login';

const RegisterLogin = () => {
    return (
        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        <h1>NEW ACCOUNT</h1>
                        <p>If you don't have an Account.<br/>
                            What are you waiting for,
                            Click Below to Create One!!!
                        </p>
                        <MyButton
                            type="default"
                            title="Create an Account"
                            linkTo="/register"
                            addStyles={{
                                margin:'10px 0 0 0 ',
                                height:'30px'
                            }}
                            />
                    </div>
                    <div className="right">
                        <h2>Registered Customers</h2>
                        <Login />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterLogin;