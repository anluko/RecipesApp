const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:Vaffchelov_B223@localhost:5432/recipesDb');


const Users = sequelize.define('Users', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true, 
      },
    Login: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Gender: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    Growth: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }, 
    Weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }, 
    ImageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    }, 
  },
  {
    schema: 'recipeSchema',
    tableName: 'Users',
    timestamps: false
  });
  
  module.exports = Users;