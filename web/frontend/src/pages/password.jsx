import React from 'react';
import '../assets/css/global.css'
import './css/login.css'
import logo from '../assets/logo.svg'
import './css/password.css'
import usePasswordTempActive from '../hooks/passwordtempActive'
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from '../assets/icons-btn/back.png'

function Password() {
    const { handcreateCodeTemp, handUpdateCodeTemp, error } = usePasswordTempActive();
    const navigate = useNavigate();

     const [username, setUsername] = useState('');
     const [code, setCode] = useState('');
     const [senha, setSenha] = useState('');
     const [repetirSenha, setRepetirSenha] = useState('');
     const [etapa, setEtapa] = useState(1);


    async function handleSubmitSendCode(event) {
        event.preventDefault()
        const toastId = toast.loading("Enviando código temporário...");
        

        const success = await handcreateCodeTemp(username);
        if(success){
            toast.update(toastId, { 
            render: "Código temporário enviado! Verifique seu email.", 
            type: "success",
            isLoading: false, 
            autoClose: 2000 
        });
            localStorage.setItem('usernameTemp', username);
            setEtapa(2);
        }

        if (error) {
            toast.update(toastId, { 
            render: error, 
            type: "error",
            isLoading: false, 
            autoClose: 3000 
        });
        }
    }

    async function handleSubmitUpdateCode(event) {
        event.preventDefault()
        const toastId = toast.loading("Alterando senha...");

        const success = await handUpdateCodeTemp(code, senha, repetirSenha);

        if(success){
            toast.update(toastId, { 
            render: "Senha alterada com sucesso!", 
            type: "success",
            isLoading: false,
            autoClose: 2000
        });
        navigate('/');
        }
        if (error) {
            toast.update(toastId, { 
            render: error, 
            type: "error",
            isLoading: false,
            autoClose: 3000
        });
        }
    }

    async function back() {
        navigate(-1);
    }

    useEffect(() => {
        localStorage.removeItem('usernameTemp');
        if (error) {
            toast.error(error);
        }
    }, []);

    return (
        <div className="password-container">
                        <div className='groupvoltar'>
                            <button className='voltar' onClick={back} type='button'>
                                <img src={backIcon} alt="voltar" className='imgvoltar'/>
                            </button>
                            <img src={logo} alt="Logo do site" />
                        </div>
                        {etapa === 1 ? (
                    <form action="" className="password-form" onSubmit={handleSubmitSendCode}>
                        <div className="inputgrouppassword primarypassword">
                            <input type="text" placeholder="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                        </div>
                        <div className='btngrouppassword'>
                            <button className="login-button" type='submit' >ENVIAR CODIGO</button>
                        </div>
                    </form>
                    ) : (
                    <form action="" className="password-form"   onSubmit={handleSubmitUpdateCode}>
                        <div className="inputgrouppassword ">
                            <input type="text" placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} required/>
                            <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required/>
                            <input type="password" placeholder="Repetir senha" value={repetirSenha} onChange={(e) => setRepetirSenha(e.target.value)} required/>
                        </div>
                        <div className='btngrouppassword '>
                            <button className="login-button" type='submit'>ALTERAR SENHA</button>
                        </div>
                    </form>
                    )}
                    
                </div>
    );
}

export default Password;