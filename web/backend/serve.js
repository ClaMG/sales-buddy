import 'dotenv/config';
import app from './src/app.js';
import sequelize from './src/config/database.js'; // Importe a conexão do Sequelize
import './src/models/implement.js'; // Basta importar o implement, ele já puxa os outros

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o SQLite estabelecida com sucesso.');
    
    await sequelize.sync({ force: false }); 
    console.log('Modelos sincronizados com o banco de dados.');

    app.listen(port, '0.0.0.0', () => {
      console.log(`Api rodando na porta ${port}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor ou banco de dados:', error);
  }
}

startServer();