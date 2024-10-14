const express = require('express');
const Models = require('../models/Models'); 
const Brands = require('../models/Brands'); 
const router = express.Router();
const sequelize = require('../db/connection'); 


router.post('/models', async (req, res) => {
    
    const modelsArray = req.body.models;

    if (!Array.isArray(modelsArray) || modelsArray.length === 0 ){
        return res.status(400).json({ error: 'É necessario um array'})
    }

    const transaction = await sequelize.transaction();
    try {
        // Cria múltiplos registros de uma vez
        await Models.bulkCreate(modelsArray, { transaction });

        // Confirma a transação
        await transaction.commit();
        res.status(201).json({ message: 'Modelos adicionados com sucesso.' });
    } catch (error) {
        // Em caso de erro, desfaz a transação
        await transaction.rollback();
        res.status(500).json({ error: 'Erro ao adicionar os modelos.', details: error.message });
    }
});

    // const {name, id_brand}= req.body;

    // try {
    //     const brand = await Brands.findByPk(id_brand);
    //     if (!brand){
    //         return res.status(400).json({error: 'Brand não encontrada'});
    //     }

    //     const newModel = await Models.create({
    //         name,
    //         id_brand
    //     });

    //     return res.status(201).json({ message: 'Modelo criado com sucesso', model : newModel})
        
    // } catch (error) {
    //     return res.status(500).json({ error: 'Erro ao criar o model', details: error.message });
    // }


///////////////////////////////////////////////////////////
////////////////// GET / READ ////////////////////////////
///////////////////////////////////////////////////////// 

router.get('/models/:brandId/:modelId?', async (req, res) => {
    const { brandId, modelId } = req.params;

    try {
        if (modelId) {
            // Se um ID do modelo for passado, busca o modelo associado à marca
            const model = await Models.findOne({
                where: {
                    id_brand: brandId, // Verifica se o modelo pertence à marca
                    id_model: modelId   // Filtra pelo ID do modelo
                }
            });

            if (!model) {
                return res.status(404).json({ error: 'Modelo não encontrado para a marca especificada.' });
            }

            return res.status(200).json({ model }); // Retorna o modelo encontrado
        } else {
            // Se apenas o ID da marca for passado, busca todos os modelos dessa marca
            const models = await Models.findAll({
                where: {
                    id_brand: brandId // Filtra os modelos pela id da marca
                }
            });

            if (models.length === 0) {
                return res.status(404).json({ error: 'Nenhum modelo encontrado para a marca especificada.' });
            }

            return res.status(200).json({ models }); // Retorna os modelos encontrados
        }
    } catch (error) {
        console.error('Erro ao encontrar: ', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
