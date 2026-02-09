import { useNavigate } from 'react-router-dom';
import '../assets/css/global.css'
import './css/login.css'
import logo from '../assets/logo.svg'
import useLoginActivite from '../hooks/loginActive'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useFormik } from 'formik'; // Importação do Hook
import * as Yup from 'yup';

const validationSchema = Yup.object({
username: Yup.string().required('O usuário é obrigatório'),
password: Yup.string().required('A senha é obrigatória'),
});
function Login() {
    const {handleSave, error, resetLocalStorage} = useLoginActivite()
    const navigate = useNavigate();


    async function passwordForget() {
        navigate('/password')
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
       onSubmit: async(values) => {
            const idToast = toast.loading("Carregando...");

        const success = await handleSave(values);

        if(success){
            toast.update(idToast, { 
            render: "Login realizado!", 
            type: "success",
            isLoading: false, 
            autoClose: 2000 
        });
            navigate('/user')
            return;
        }else{
             toast.update(idToast, { 
            render: error || "Erro ao Logar", 
            type: "error",
            isLoading: false, 
            autoClose: 3000 
        }); 
        }

    }});

    const handleButtonClick = () => {
        if (!formik.isValid) {
            const firstError = Object.values(formik.errors)[0];
            if (firstError) {
                toast.error(firstError);
            }
        }
    };

    

    useEffect(() => {
           resetLocalStorage()
        }, []);
    
    return (
        <div className="login-container">
            <form action="" className="login-form" onSubmit={formik.handleSubmit}>
                <img src={logo} alt="Logo do site" />
                <div className="input-group-login">
                    <input type="text" name="username" placeholder="Usuário" value={formik.values.username} 
                        onChange={formik.handleChange}/>
                    <input type="password" name="password" placeholder="Senha" value={formik.values.password} 
                        onChange={formik.handleChange}/>
                </div>
                <div className='button-group-login'>
                    <button className="login-button" type='submit' onClick={handleButtonClick}>LOGIN</button>
                    <button className="forgot-password-button" type='button' onClick={passwordForget}>Esqueci a senha</button>
                </div>
            </form>
        </div>
    );

}

export default Login;