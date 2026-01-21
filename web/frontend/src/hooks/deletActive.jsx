import api from '../services/api.jsx';
import { useState } from 'react';
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
        .map(usuario => usuario.nome);

        setNames(nomesEncontrados);
        return nomesEncontrados;

        } catch (err) {
            console.error("Erro ao buscar nomes:", err); 
            setError("Não foi possível carregar os nomes."); 
            return [];
        }

    } 


    const handleSave =  async(ids, idUser) => {
        try {
            setError(null)
            const userFromApi = await api.delete('user/delet',{
                data: { ids: ids, idUser }
            })

            navigate('/user')
            return userFromApi
        } catch (err) {
            const errorMessage = err || 'Erro Interno';
            setError(errorMessage)
            navigate('/user')
            console.error(err);
        }
    }
    
    return{handleSave, error, getDelet, names}
}

export default useDeletActive
