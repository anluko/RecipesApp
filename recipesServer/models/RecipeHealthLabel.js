const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:Vaffchelov_B223@localhost:5432/recipesDb');


const RecipeHealthLabel = sequelize.define('RecipeHealthLabel', {
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
    HealthLabelId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'HealthLabel',
        key: 'Id',
      },
    },
  },
  {
    schema: 'recipeSchema',
    tableName: 'RecipeHealthLabel',
    timestamps: false
  });
  
  module.exports = RecipeHealthLabel;