const { Sequelize } = require("sequelize");

const { sequelize } = new Sequelize('wallet2', 'root', '', {dialect:"mysql", host: "localhost"})

function init(){
    sequelize.sync().then(res=> {
        console.log("database connected successfully")
    }).catch(err =>{console.log("error", err)})
}

exports.init = init
exports.sequelize= sequelize;