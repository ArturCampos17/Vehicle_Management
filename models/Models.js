const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');
const Brands = require('./Brands');


const Models = sequelize.define('Model' ,{
    
    id_model: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_brand: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Brands, 
            key: 'id_brand'
        }
    }
    
}, {
    tableName: 'models',
    timestamps: false
});


module.exports = Models;