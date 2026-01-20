import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';   // Rotas de usuário
import salesRoutes from './routes/salesRoutes.js'; // Rotas de vendas 

const app = express();

app.use(cors({
    origin: '*', // Em produção, substitua pelo domínio do seu front (ex: http://localhost:5173)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/user', userRoutes);

app.use('/sales', salesRoutes);

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    console.error('Erro não tratado:', err.stack);
    res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
});

export default app;
