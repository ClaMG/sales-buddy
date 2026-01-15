import axios from 'axios';

export const api = axios.create({ 
    baseURL: 'http://localhost:3000' 
});

//Envia o token para o Back-end
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
        // Alinha com o seu authMiddleware que espera "Bearer <token>"
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

//Trata as mensagens de erro do Back-end
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        //token provavelmente expirou
        if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem('token');
        }

        const mensagem = error.response?.data?.message || "Erro interno no servidor";
        
        return Promise.reject(mensagem);
    }
);

export default api;
