const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model")(sequelize, Sequelize);
db.posts = require("./post.model")(sequelize, Sequelize);
db.comments = require("./comment.model")(sequelize, Sequelize);
db.replies = require("./reply.model")(sequelize, Sequelize);
db.chats = require("./chat.model")(sequelize, Sequelize);
db.ratings = require("./rating.model")(sequelize, Sequelize);
db.friends = require("./friend.model")(sequelize, Sequelize);
db.pendingRequests = require("./pendingRequest.model")(sequelize, Sequelize);
module.exports = db;
