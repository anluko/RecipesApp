const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:Vaffchelov_B223@localhost:5432/recipesDb');


const UserDiets = sequelize.define('UserDiets', {
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
    tableName: 'UserDiets',
    timestamps: false
  });
  
  module.exports = UserDiets;