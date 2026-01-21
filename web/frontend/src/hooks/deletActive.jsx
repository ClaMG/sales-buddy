import api from '../services/api';
import { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

function useDeletActive(){
    const [error, setError] = useState(null);
    const [names, setNames] = useState([]);
    const navigate = useNavigate()

    async function getDelet(ids) {
       try {
            setError(null)
            const response = await api.get('user/users'); 
            const todosUsuarios = response.data; // O Axios coloca a resposta dentro de 'data' 

            //Filtra quem tem o ID na lista e pega só o nome 
            const nomesEncontrados = todosUsuarios 
            .filter(usuario => ids.includes(usuario.id)) 
            .map(usuario => usuario.usuario);

            setNames(nomesEncontrados);
            return nomesEncontrados;

        } catch (err) {
            if(!err.response || !err) {
                setError("O servidor está offline. Volte mais tarde.");
                navigate('/')
            }
            if (err.response || err) {
            console.error("Erro ao buscar nomes:", err); 
            setError("Não foi possível carregar os nomes."); 
            return [];
        }
            
        }

    } 


    const handleSave =  async(ids) => {
        

        const token = localStorage.getItem('token'); 
        
        try {
            setError(null)
            const decoded = jwtDecode(token);
            const idUser = decoded.id;
            const userFromApi = await api.delete('user/delet',{
                data: { ids: ids, idUser }
            })

            return userFromApi
        } catch (err) {
            if(!err.response || !err) {
                setError("O servidor está offline. Volte mais tarde.");
                navigate('/')
            }
            if (err.response || err) {
            const errorMessage = err || "Erro Interno";
            setError(errorMessage); 
            console.log(errorMessage); 
        }
        }
    }
    
    return{handleSave, error, getDelet, names}
}

export default useDeletActive
