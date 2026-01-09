import 'dotenv/config';
import app from './src/app.js';
import './src/models/Usermodels.js';
import './src/models/vendasModels.js';

const port = process.env.PORT || 3000; // Agora o process.env funciona!

app.listen(port, () => {
    console.log(`Api rodando na porta ${port}`);
});