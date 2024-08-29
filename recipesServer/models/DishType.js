const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:Vaffchelov_B223@localhost:5432/recipesDb');

const DishType = sequelize.define('DishType', {
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
    tableName: 'DishType',
    timestamps: false
  });
  
  module.exports = DishType;