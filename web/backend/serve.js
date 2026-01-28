import 'dotenv/config'; 
import app from './src/app.js';
import sequelize from './src/config/database.js';
import './src/models/implementSales.js'; 
import './src/models/implementUser.js'; 

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    //Testa a conexão com o banco
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida.');
    
    //Sincroniza as tabelas 
    await sequelize.sync({ force: false }); 
    console.log('Modelos sincronizados.');

    //Inicia o servidor
    app.listen(port, '0.0.0.0', () => {
      console.log(`Servidor rodando em: http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
}

startServer();
