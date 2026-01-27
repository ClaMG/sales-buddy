import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../assets/css/global.css'
import './css/login.css'
import logo from '../assets/logo.svg'
import useLoginActivite from '../hooks/loginActive'
import { toast } from 'react-toastify';
import { useEffect } from 'react';


function Login() {
    const {handleSave, error, resetLocalStorage} = useLoginActivite()
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function passwordForget() {
        navigate('/password')
    }


    async function handleSubmit(event) {
        event.preventDefault()

        const success = await handleSave({ username, password });

        if(success){
            toast.success("Login realizado!");
            navigate('/user')
            return
        }
        if (error) {
            toast.error(error); 
        }
    }

    useEffect(() => {
           resetLocalStorage()
        }, []);
    
    return (
        <div className="login-container">
            <form action="" className="login-form" onSubmit={handleSubmit}>
                <img src={logo} alt="Logo do site" />
                <div className="input-group-login">
                    <input type="text" placeholder="Usuário" value={username} onChange={(e)=> setUsername(e.target.value)} required/>
                    <input type="password" placeholder="Senha" value={password} onChange={(e)=> setPassword(e.target.value)} required/>
                </div>
                <div className='button-group-login'>
                    <button className="login-button" type='submit'>LOGIN</button>
                    <button className="forgot-password-button" type='button' onClick={passwordForget}>Esqueci a senha</button>
                </div>
            </form>
        </div>
    );

}

export default Login;