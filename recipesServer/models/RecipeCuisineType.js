const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:Vaffchelov_B223@localhost:5432/recipesDb');


const RecipeCuisioneType = sequelize.define('RecipeCuisioneType', {
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
    CuisineTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CuisineType',
        key: 'Id',
      },
    },
  },
  {
    schema: 'recipeSchema',
    tableName: 'RecipeCuisineType',
    timestamps: false
  });
  
  module.exports = RecipeCuisioneType;