import React, { useState } from "react";
import AuthForm from "components/AuthForm";
import { Link } from "react-router-dom";


const Auth = () => {
    

    return (
        <div className="authContainer"
        >

            <img src="assets/playdata.png"
                style={{
                    marginBottom: 30,
                    width: "20%",
                    height: "auto"
                }}>
            </img>
            <AuthForm />
            <Link to="/SignUp">
                <button className="authSignup">회원가입</button>
            </Link>
        </div>
    )
};
export default Auth;