const { DataTypes } = require('sequelize');
const db = require('../db/connection');
const Models = require('./Models');

const Versions = db.define('Versions', {
    id_version: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_model: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Models',
            key: 'id_model'
        }
    }
}, {
        tableName: 'versions',
        timestamps: false
    });

module.exports = Versions;
