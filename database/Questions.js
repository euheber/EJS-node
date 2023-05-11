const { Sequelize } = require("sequelize");

const connection = require('./database')


const Question = connection.define('Pergunta', { 
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
        descripiton: { 
            type: Sequelize.TEXT,
            allowNull: false
        }
})

Question.sync({force: false}).then(() => console.log('Tabela criada'))

