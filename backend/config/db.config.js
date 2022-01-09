const Sequelize = require('sequelize');
require('dotenv').config()
const DB = process.env;

const sequelize = new Sequelize(DB.SQL_DATABASE_NAME, DB.SQL_USER, DB.SQL_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
  try {
    sequelize.authenticate();
    console.log('Connexion à la base de données réussie !!');
  } catch (error) {
    console.error('Connexion à la base de données échouée :', error);
  }
  const db = {};

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;


module.exports = db;