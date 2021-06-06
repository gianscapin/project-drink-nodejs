const express = require('express');
const router = express.Router();
const dataProduct = require('../data/productdb');
const joi = require('joi');

// /api/products

// GET

router.get('/', async(req,res,next)=>{
    let products = await dataProduct.getProducts();
    res.json(products);
});

router.get('/:id', async (req,res) => {
    
    const product = await dataProduct.getProduct(req.params.id);

    if(product){
        res.json(product);
    }else{
        res.status(404).send('No se encontró el producto.');
    }

});

// POST

router.post('/', async(req,res) => {

    const schema = joi.object({
        name: joi.string().min(3).max(30).required(),
        price: joi.number().min(1).max(10000000),
        description: joi.string().min(3).max(30).required(),
        brand: joi.string().min(3).max(30).required(),
        category: joi.string().min(3).max(30).required(),
        alcohol: joi.boolean()
    });

    const result = schema.validate(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
    }else{
        let product = req.body;
        product = await dataProduct.addProduct(product);
        res.json(product);
    }

});

// UPDATE

router.put('/:id', async (req,res) => {

    const schema = joi.object({
        name: joi.string().alphanum().min(3).required,
        price: joi.number().min(1).max(10000000).required,
        description: joi.string().alphanum().min(3).required,
        brand: joi.string().alphanum().min(3).required,
        category: joi.string().alphanum().min(3).required,
        alcohol: joi.boolean()
    });

    const result = schema.validate(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
    }else{
        let product = req.body;
        product._id = req.params.id;
        product = await dataProduct.updateProduct(product);
        res.json(product);
    }
});

// DELETE

router.delete('/:id', async (req,res) => {
    const product = await dataProduct.getProduct(req.params.id);

    if(product){
        dataProduct.deleteProduct(req.params.id);
    }else{
        res.status(404).send('Producto no encontrado.');
    }
});

module.exports = router;

