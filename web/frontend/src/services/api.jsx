import axios from 'axios';


export const api = axios.create({ baseURL: 'http://localhost:3000' });

//Interceptor
api.interceptors.response.use(
    response => response,
    error => {
        //Pega a mensagem vinda do back
        return Promise.reject(error.response?.data?.message || "Erro interno no servidor");
    }
);

api.interceptors.response.use((config)=>{
    const token = localStorage.getItem('token')
    //Manda o token
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config
}, (error)=>{
    return Promise.reject(error)
})

export default api;