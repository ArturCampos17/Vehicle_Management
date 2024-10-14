const express = require('express');
const db = require('./db/connection');
const brandsRoutes = require('./src/brands');
const modelsRoutes = require('./src/models');
const versionsRoutes = require('./src/versions');
const { Brands, Models, Versions } = require('./models/associations');
const sequelize = require('./db/connection'); 
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON e URL-encoded
 app.use(cors());
app.use(express.json()); // Para application/json
app.use(express.urlencoded({ extended: true })); // Para application/x-www-form-urlencoded

// Conectar ao banco de dados
db.sync()
  .then(() => {
    console.log('Conectou ao banco com sucesso');

    // Sincroniza os modelos (cria tabelas se não existirem)
    return sequelize.sync(); // Usando a conexão do Sequelize
  })
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso');
    return db.getQueryInterface().showAllTables();
})
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso');

    // ROTAS
    app.use('/api', brandsRoutes);
    app.use('/api', modelsRoutes);
    app.use('/api', versionsRoutes);

    // Iniciar o servidor
    app.listen(PORT, () => {
      console.log(`O Express está rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Ocorreu um erro ao conectar ao banco', err);
  });

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});
