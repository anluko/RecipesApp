const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:Vaffchelov_B223@localhost:5432/recipesDb');


const RecipeNutrient = sequelize.define('RecipeNutrient', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true, 
    },
    RecipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Recipe',
        key: 'Id',
      },
    },
    NutrientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Nutrient',
        key: 'Id',
      },
    },
  },
  {
    schema: 'recipeSchema',
    tableName: 'RecipeNutrient',
    timestamps: false
  });
  
  module.exports = RecipeNutrient;