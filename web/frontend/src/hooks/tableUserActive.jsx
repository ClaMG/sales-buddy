import api from '../services/api.jsx';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';


function useTableUserActions(){
   const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
                idsSelecionados: []
            });
    const navigate = useNavigate();

    async function getUser() {
        try {
            setError(null);
            const userFromApi = await api.get('user/users');
            setUsers(userFromApi.data); 
        } catch (err) {
            const errorMessage = err || 'Erro Interno';
            setError(errorMessage)
            console.error(err);
        }
    }


    async function send(id, usuario, nome, empresa, cnpj, email) {
        localStorage.setItem("idUpdate", id)
        localStorage.setItem("usuarioUpdate", usuario)
        localStorage.setItem("nomeUpdate", nome)
        localStorage.setItem("empresaUpdate", empresa)
        localStorage.setItem("cnpjUpdate", cnpj)
        localStorage.setItem("emailUpdate", email)
       
        navigate('/update')
    }

    
    const receberIds = useCallback((novosIds) => {
        // Atualização
        setFormData(prev => {
            const estadoAtualizado = {
                ...prev,
                idsSelecionados: novosIds
            };
            
            localStorage.setItem('arrayIds', JSON.stringify(estadoAtualizado.idsSelecionados))
            return estadoAtualizado;
        });
    }, []);

    return { users, getUser, error, send, formData, receberIds };
}

export default useTableUserActions
