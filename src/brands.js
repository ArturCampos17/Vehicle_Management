const express = require('express');
const router = express.Router();
const sequelize = require('../db/connection');
const Brands = require('../models/Brands')


router.post('/brands', async(req, res)=> {
    
    /// post add array http://localhost:3000/api/brands/
    
    try {
        const { brands } = req.body; 

        if (!Array.isArray(brands) || brands.length === 0) {
            return res.status(400).json({ error: 'Um array de marcas é necessário.' });
        }

        // Criar várias marcas de uma vez em um array
        const createdBrands = await Brands.bulkCreate(brands);

        console.log('Marcas adicionadas com sucesso: ', createdBrands);
        res.status(201).json({ message: 'Marcas adicionadas com sucesso', createdBrands });
    } catch (error) {
        console.error('Erro ao criar Marcas:', error);
        res.status(500).json({ error: error.message });
    }
    
    // let transaction;
    // try {

    //     const {name} = req.body ;
        
    //     transaction = await sequelize.transaction();

    //     const brands = await Brands.create(
    //         {
    //         name,
    //         }, 
    //     { transaction }
    //     );
        
    //     console.log('Brand added successfully: ', brands)
        
    //     // Confirma a transação
    //     await transaction.commit();
    //     console.log('Brand added successfully!');

    //     res.status(201).json({ message: 'Brand added successfully: ', brands});
     
    // } catch (error) {
    //     console.error('Erro ao criar Marca', error);
    //     if (transaction) await transaction.rollback();
    //     res.status(500).json({ error: error.message });
    // }

});


///////////////////////////////////////////////////////////
////////////////// GET / READ ////////////////////////////
///////////////////////////////////////////////////////// 
// http://localhost:3000/api/brands/

router.get('/brands/:id?', async(req, res)=> {
    
    const {id} = req.params;

    try {
        if (id) {
            //se passar id ele busca
        const brand = await Brands.findByPk(id);
        if (!brand){
            return res.status(404).json({ error:' Marca não encontrada'});
        }
        res.status(200).json({brand});
    } else {
        //se nao passar id busca todos
        const brands = await Brands.findAll();
        return res.status(200).json({brands});
    }
    
    } catch(error){
        console.error('Erro ao encontrar: ',error)
        res.status(500).json({error: error.message})
    }
    
});


module.exports = router;