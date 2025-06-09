
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Role = sequelize.define('Role', {
  name: DataTypes.STRING
});

module.exports = Role;
