import 'dotenv/config';
import app from './src/app.js';
import './src/models/userModels.js';
import './src/models/implement.js';
import './src/models/items.js';
import './src/models/salesModels.js';

const port = process.env.PORT || 3000; // Agora o process.env funciona!

app.listen(port, () => {
    console.log(`Api rodando na porta ${port}`);
});