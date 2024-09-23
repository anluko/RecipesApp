const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:Vaffchelov_B223@localhost:5432/recipesDb');


const NewsTab = sequelize.define('NewsTab', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true, 
    },
    Title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ImageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    schema: 'recipeSchema',
    tableName: 'NewsTab',
    timestamps: false
  });
  
  module.exports = NewsTab;