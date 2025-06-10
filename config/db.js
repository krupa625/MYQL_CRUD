const { Sequelize } = require('sequelize');
const { db_host,db_name,db_pass,db_user} = require('./config');

const sequelize = new Sequelize(db_name, db_user, db_pass, {
  host: db_host,
  dialect: 'mysql',
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log("Database connected"))
  .catch(err => console.log("Error: " + err));

module.exports = sequelize;
