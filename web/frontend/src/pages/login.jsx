//import { use } from 'react';
import { useEffect, useRef } from 'react'
//import { useNavigate } from 'react-router-dom';
import '../assets/css/global.css'



function Login() {
    const inputUsername = useRef();
    const inputPassword = useRef();
    //const navigate = useNavigate();

    useEffect(() => {

    }, []);
    return (
        <div className="login-container">
            <form action="">
                <img src="#" alt="Logo do site" />
                <div>
                    <input type="text" placeholder="Username" ref={inputUsername} />
                    <input type="password" placeholder="Password" ref={inputPassword} />
                </div>
                <button>LOGIN</button>
                <button>Esqueci a senha</button>
            </form>
        </div>
    );

}

export default Login;