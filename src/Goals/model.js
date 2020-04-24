const Sequelize = require("sequelize");
const sequelize = require("../../db");
const User = require("../User/model");

const Goal = sequelize.define("goal", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

Goal.belongsTo(User);
User.hasMany(Goal);

module.exports = Goal;
