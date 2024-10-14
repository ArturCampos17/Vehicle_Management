const Brands = require('./Brands');
const Models = require('./Models');
const Versions = require('./Versions');

// Definindo as associações
Models.belongsTo(Brands, { foreignKey: 'id_brand' });
Brands.hasMany(Models, { foreignKey: 'id_brand' });
Versions.belongsTo(Models, { foreignKey: 'id_model' });
Models.hasMany(Versions, { foreignKey: 'id_model' });

module.exports = {
    Brands,
    Models,
    Versions
};
