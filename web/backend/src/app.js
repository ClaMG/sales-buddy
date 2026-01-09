import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';// Importa as rotas de usuário

const app = express();
app.use(express.json());

app.use(cors());
app.use('/api', userRoutes);

export default app;