const Sequelize = require('sequelize');

const sequelize = new Sequelize('readrs', 'cheap_readers', 'READRSARELEADERS2020', { dialect: 'postgres' });

module.exports.sequelize = sequelize;

/*
this file creat the database the following order is datbase name, username, password,
type of database language repesectivley to the sequelize varaible
*/
