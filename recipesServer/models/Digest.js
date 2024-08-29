const { Sequelize, DataTypes } = require('sequelize');
const Ingredient = require('./Ingredient');
const sequelize = new Sequelize('postgres://postgres:Vaffchelov_B223@localhost:5432/recipesDb');

const Digest = sequelize.define('Digest', {
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
    Tag: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    SchemaOrgTag: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Total: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    }, 
    HasRdi: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    Daily: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    Unit: {
      type: DataTypes.TEXT,
      allowNull: true,
    }, 
  },
  {
    schema: 'recipeSchema',
    tableName: 'Digest',
    timestamps: false
  });
  
  module.exports = Digest;