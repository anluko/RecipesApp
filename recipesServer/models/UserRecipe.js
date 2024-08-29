const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:Vaffchelov_B223@localhost:5432/recipesDb');


const UserRecipe = sequelize.define('UserRecipe', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true, 
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'Id',
        },
      },
    RecipeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Recipe',
        key: 'Id',
      },
    },
  },
  {
    schema: 'recipeSchema',
    tableName: 'UserRecipe',
    timestamps: false
  });
  
  module.exports = UserRecipe;