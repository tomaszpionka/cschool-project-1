const Sequelize = require("sequelize");
const db = require("../database/db");

const Order = db.sequelize.define("order", {
  order_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  item_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  item_owner: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  item_buyer: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  order_success: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn("NOW"),
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn("NOW"),
  },
});

module.exports = Order;
