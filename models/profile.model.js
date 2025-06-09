// models/profile.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Profile = sequelize.define('Profile', {
  bio: DataTypes.STRING,
  age: DataTypes.INTEGER
});

module.exports = Profile;
