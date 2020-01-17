const Sequelize = require("sequelize");
const sequelize = require('../dbConnection/sequelize')

const Product = sequelize.define(
  "product",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    },
    brand: {
      type: Sequelize.STRING
    },
    imageUrl: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    category: {
      type: Sequelize.STRING
    }
  },
  {
    // options
  }
);

module.exports = Product;
