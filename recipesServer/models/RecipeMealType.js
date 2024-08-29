const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:Vaffchelov_B223@localhost:5432/recipesDb');


const RecipeMealType = sequelize.define('RecipeMealType', {
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
    MealTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'MealType',
        key: 'Id',
      },
    },
  },
  {
    schema: 'recipeSchema',
    tableName: 'RecipeMealType',
    timestamps: false
  });
  
  module.exports = RecipeMealType;