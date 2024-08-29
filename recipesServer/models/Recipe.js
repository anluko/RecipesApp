const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:Vaffchelov_B223@localhost:5432/recipesDb');

const Recipe = sequelize.define('Recipe', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true, 
    },
    Label: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ImageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Source: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    SourceUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    }, 
    Yield: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    Calories: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    }, 
    TotalTime: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },  
    TotalCO2Emissions: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },  
    TotalWeight: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    }, 
  },
  {
    schema: 'recipeSchema',
    tableName: 'Recipe',
    timestamps: false
  });
  
  module.exports = Recipe;