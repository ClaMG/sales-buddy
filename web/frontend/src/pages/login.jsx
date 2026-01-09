import { useNavigate } from 'react-router-dom';
import '../assets/css/global.css'
import './css/login.css'
import logo from '../assets/logo.svg'



function Login() {
    const navigate = useNavigate();

    async function goToUserPage() {
        navigate('/user');
    }

    
    return (
        <div className="login-container">
            <form action="" className="login-form">
                <img src={logo} alt="Logo do site" />
                <div className="input-group-login">
                    <input type="text" placeholder="Usuário" />
                    <input type="password" placeholder="Senha" />
                </div>
                <div className='button-group-login'>
                    <button className="login-button" onClick={goToUserPage}>LOGIN</button>
                    <button className="forgot-password-button">Esqueci a senha</button>
                </div>
            </form>
        </div>
    );

}

export default Login;