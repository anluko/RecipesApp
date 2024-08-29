const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:Vaffchelov_B223@localhost:5432/recipesDb');


const Ingredient = sequelize.define('Ingredient', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true, 
    },
    Text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Quantity: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    Measure: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Food: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Weight: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    FoodCategory: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ImageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },   
  },
  {
    schema: 'recipeSchema',
    tableName: 'Ingredient',
    timestamps: false
  });
  
  module.exports = Ingredient;