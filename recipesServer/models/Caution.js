const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:Vaffchelov_B223@localhost:5432/recipesDb');


const Caution = sequelize.define('Caution', {
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
  },
  {
    schema: 'recipeSchema',
    tableName: 'Caution',
    timestamps: false
  });
  
  module.exports = Caution;