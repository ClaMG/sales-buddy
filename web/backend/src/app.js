import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';   // Rotas de usuário (Login/Cadastro)
import salesRoutes from './routes/salesRoutes.js'; // Rotas de vendas (Tabela/Comprovante)

const app = express();

/**
 * 1. CONFIGURAÇÃO DO CORS
 * Deve vir antes de qualquer rota. Ele autoriza o Frontend a enviar 
 * cabeçalhos como 'Authorization'.
 */
app.use(cors({
    origin: '*', // Em produção, substitua pelo domínio do seu front (ex: http://localhost:5173)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

/**
 * 2. MIDDLEWARE PARA JSON
 * Necessário para que o Express consiga ler o 'req.body' enviado pelo frontend.
 */
app.use(express.json());

/**
 * 3. ROTAS DA APLICAÇÃO
 * As rotas são registradas aqui. 
 * Se você quiser proteger TODAS as rotas de vendas, você pode aplicar o 
 * middleware diretamente aqui ou dentro do arquivo salesRoutes.js.
 */

// Rotas públicas (geralmente login não precisa de token para entrar)
app.use('/user', userRoutes);

// Rotas protegidas (Vendas e Comprovantes)
app.use('/sales', salesRoutes);

/**
 * 4. TRATAMENTO DE ERROS GLOBAL (Opcional, mas recomendado)
 * Caso algum erro não seja capturado nos controllers.
 */
app.use((err, req, res, next) => {
    console.error('Erro não tratado:', err.stack);
    res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
});

export default app;
