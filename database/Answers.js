const { Sequelize, INTEGER } = require("sequelize");
const connection = require('./database')



const Answer = connection.define('Answers', { 
    body: { 
        type: Sequelize.TEXT,
        allowNull:false,
    },

    AnswerTo:{
        type: Sequelize.INTEGER
    }
})


Answer.sync({force: false}).then( () => console.log('Tudo certo'))


module.exports = Answer
