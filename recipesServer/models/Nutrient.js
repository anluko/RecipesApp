const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:Vaffchelov_B223@localhost:5432/recipesDb');


const Nutrient = sequelize.define('Nutrient', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true, 
    },
    Label: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Quantity: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    Unit: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    schema: 'recipeSchema',
    tableName: 'Nutrient',
    timestamps: false
  });
  
  module.exports = Nutrient;