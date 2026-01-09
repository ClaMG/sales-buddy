//import { use } from 'react';
import { useEffect, useRef } from 'react'
//import { useNavigate } from 'react-router-dom';
import '../assets/css/global.css'
import './css/login.css'
import logo from '../assets/logo.svg'



function Login() {
    const inputUsername = useRef();
    const inputPassword = useRef();
    //const navigate = useNavigate();

    useEffect(() => {

    }, []);
    return (
        <div className="login-container">
            <form action="">
                <img src={logo} alt="Logo do site" />
                <div className="input-group-login">
                    <input type="text" placeholder="Usuario" ref={inputUsername} />
                    <input type="password" placeholder="Senha" ref={inputPassword} />
                </div>
                <div className='button-group-login'>
                    <button className="login-button">LOGIN</button>
                    <button className="forgot-password-button">Esqueci a senha</button>
                </div>
            </form>
        </div>
    );

}

export default Login;