const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:Vaffchelov_B223@localhost:5432/recipesDb');

const CuisineType = sequelize.define('CuisineType', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true, 
    },
    Name: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },
  {
    schema: 'recipeSchema',
    tableName: 'CuisineType',
    timestamps: false
  });
  
  module.exports = CuisineType;