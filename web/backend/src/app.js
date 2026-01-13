import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';// Rotas de usuário
import salesRoutes from './routes/salesRoutes.js';// Rotas de vendas

const app = express();
app.use(express.json());

app.use(cors());
app.use('/user', userRoutes);
app.use('/sales', salesRoutes);

export default app;