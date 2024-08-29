const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:Vaffchelov_B223@localhost:5432/recipesDb');


const RecipeDishType = sequelize.define('RecipeDishType', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true, 
    },
    RecipeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Recipe',
        key: 'Id',
      },
    },
    DishTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'DishType',
        key: 'Id',
      },
    },
  },
  {
    schema: 'recipeSchema',
    tableName: 'RecipeDishType',
    timestamps: false
  });
  
  module.exports = RecipeDishType;