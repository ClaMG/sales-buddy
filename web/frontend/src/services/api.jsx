import axios from 'axios';

export const api = axios.create({ 
    baseURL: 'http://localhost:3000' 
});

/**
 * INTERCEPTOR DE REQUISIÇÃO
 * Adiciona o token no cabeçalho antes da mensagem sair do navegador.
 */
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
        // O "Bearer " precisa do espaço para o seu middleware dar o .split(' ')[1]
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

/**
 * INTERCEPTOR DE RESPOSTA
 * Se o backend disser que o token é inválido (401 ou 403), desloga o usuário.
 */
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Se o erro for de autenticação, limpa o token e redireciona (opcional)
        if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem('token');
            // window.location.href = '/login'; // Descomente para forçar logout
        }

        // Pega a mensagem de erro vinda do backend ou uma padrão
        const mensagem = error.response?.data?.message || "Erro de conexão com o servidor";
        
        return Promise.reject(mensagem);
    }
);

export default api;
