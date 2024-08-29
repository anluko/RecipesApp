const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:Vaffchelov_B223@localhost:5432/recipesDb');


const RecipeCaution = sequelize.define('RecipeCaution', {
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
    CautionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Caution',
        key: 'Id',
      },
    },
  },
  {
    schema: 'recipeSchema',
    tableName: 'RecipeCaution',
    timestamps: false
  });
  
  module.exports = RecipeCaution;