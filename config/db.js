const { Sequelize } = require('sequelize');
const { DB_PASS } = require('./config');

const sequelize = new Sequelize('CRUD_db', 'root', DB_PASS, {
  host: '127.0.0.1',
  // host: 'localhost',
  dialect: 'mysql',
  
});

sequelize.authenticate()
  .then(() => console.log("Database connected"))
  .catch(err => console.log("Error: " + err));

module.exports = sequelize;
