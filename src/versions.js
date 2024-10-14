const express = require('express');
const router = express.Router();
const Versions = require('../models/Versions')
const Models = require('../models/Models')


///http://localhost:3000/api/versions/

router.post('/versions', async (req, res) => {
    const versionsData = req.body.versions;
    
    if (!Array.isArray(versionsData) || versionsData.length === 0) {
        return res.status(400).json({ error: "Por favor, forneça um array de versões." });
    }

    try {
        const createdVersions = [];

        for (const version of versionsData) {
            const { name, id_model } = version;

            if (!name || !id_model) {
                return res.status(400).json({ error: "Por favor, forneça o nome da versão e o ID do modelo." });
            }

            console.log('Dados a serem inseridos:', { name, id_model });

            const model = await Models.findByPk(id_model);
            if (!model) {
                return res.status(404).json({ error: 'Modelo não encontrado.' });
            }

            const newVersion = await Versions.create({
                name,
                id_model
            });

            createdVersions.push(newVersion);
        }

        return res.status(201).json({ message: 'Versões criadas com sucesso.', versions: createdVersions });
    } catch (error) {
        console.error('Erro ao criar versão:', error);
        return res.status(500).json({ error: 'Erro ao criar versão.' });
    }

});
module.exports = router;
