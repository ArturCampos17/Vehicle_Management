

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',   
    user: 'root',  
    password: 'arpa',
    database: 'concessionaria'
});

// Conectando ao banco de dados
connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados com sucesso!');
});

module.exports = connection;

const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('concessionaria', 'root', 'arpa', {
    host: 'localhost',
    dialect: 'mysql'
});

// Testar a conexão
sequelize.authenticate()
    .then(() => {
        console.log('Conectado ao banco de dados com sucesso!');
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados:', err);
    });

module.exports = sequelize;


// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: './db/app.db',
//   pool: {
//     max: 5,         // Número máximo de conexões no pool
//     min: 0,         // Número mínimo de conexões no pool
//     acquire: 30000, // Tempo máximo de espera para uma conexão (em ms)
//     idle: 10000     // Tempo máximo de inatividade de uma conexão (em ms)
//   }
// });

// module.exports = sequelize

