import api from '../services/api.jsx';
import { useState } from 'react';

function useComprovanteActive(){
    const [sales, setSales] = useState([]);
    const [error, setError] = useState(null);

    async function getComprovante() {
        const id = localStorage.getItem('idComprovante')
        console.log(id)
        try {
            setError(null)
            const salesFromApi = await api.post('sales/comprovante',{
                id: id
            });
            console.log("Dados que chegaram da API:", salesFromApi.data); // VEJA SE É [] OU {}
            setSales(salesFromApi.data)
        } catch (err) {
            const errorMessage = err|| 'Erro Interno';
            setError(errorMessage)
            console.error(err);
        }
    }

    return {getComprovante, sales, error} 
}

export default useComprovanteActive
