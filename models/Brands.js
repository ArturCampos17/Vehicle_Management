const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Brands = sequelize.define('Brands' ,{
    
    id_brand: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'brands',
    timestamps: false
});

module.exports = Brands;