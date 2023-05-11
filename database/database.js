const { Sequelize } = require("sequelize");

const connection = new Sequelize('perguntas', 'root', '2215', { 
    host: 'localhost',
    dialect: 'mysql'
})


module.exports = connection
