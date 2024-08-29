const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:Vaffchelov_B223@localhost:5432/recipesDb');


const RecipeIngredient = sequelize.define('RecipeIngredient', {
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
    IngredientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Ingredient',
        key: 'Id',
      },
    }, 
  },
  {
    schema: 'recipeSchema',
    tableName: 'RecipeIngredient',
    timestamps: false
  });
  
  module.exports = RecipeIngredient;