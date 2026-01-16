import axios from 'axios';

export const api = axios.create({ 
    baseURL: 'http://localhost:3000' 
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        
    } 

    return config;
}, (error) => {
    console.error("DEBUG INTERCEPTOR REQUISIÇÃO:", error);
    return Promise.reject(error);
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // DEBUG 3: Detalhes do erro que o servidor retornou
        console.error("DEBUG INTERCEPTOR RESPOSTA - Status:", error.response?.status);
        console.error("DEBUG INTERCEPTOR RESPOSTA - Dados:", error.response?.data);

        if (error.response?.status === 401 || error.response?.status === 403) {
            console.warn("Limpando token por erro de autenticação...");
            localStorage.removeItem('token');
        }

        const mensagem = error.response?.data?.message || "Erro de conexão com o servidor";
        return Promise.reject(mensagem);
    }
);

export default api;