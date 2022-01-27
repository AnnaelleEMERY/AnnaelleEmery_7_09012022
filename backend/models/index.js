const dbConfig = require("../config/db.config.js");
require('dotenv').config();

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.SQL_DATABASE_NAME,process.env.SQL_USER,process.env.SQL_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.posts = require("./post.js")(sequelize, Sequelize);
db.users = require("./user.js")(sequelize, Sequelize)
db.comments = require("./comment.js")(sequelize, Sequelize)

// Lien entre les utilisateurs et leurs posts
db.users.hasMany(db.posts)
db.posts.belongsTo(db.users)

// Lien entre les posts et leurs commentaires
db.posts.hasMany(db.comments)
db.comments.belongsTo(db.posts)

// Lien entre les utilisateurs et leurs commentaires
db.users.hasMany(db.comments)
db.comments.belongsTo(db.users)

// Si un user est supprimé, alors ses posts aussi
db.users.hasMany(db.posts, {onDelete: "cascade"});

// Si un user est supprimé, alors ses commentaires aussi
db.users.hasMany(db.comments, {onDelete: "cascade"});

// Si un post est supprimé, alors ses commentaires aussi
db.posts.hasMany(db.comments, {onDelete: "cascade"});

db.sequelize.sync({ alter:true });

module.exports = db;
