const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:Vaffchelov_B223@localhost:5432/recipesDb');


const RecipeDietLabel = sequelize.define('RecipeDietLabel', {
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
    DietLabelId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'DietLabel',
        key: 'Id',
      },
    },
  },
  {
    schema: 'recipeSchema',
    tableName: 'RecipeDietLabel',
    timestamps: false
  });
  
  module.exports = RecipeDietLabel;