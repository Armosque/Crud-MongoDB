const express = require("express");
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require("./models/productsModels");

app.use(express.json());

const URL_CONECTION = process.env.URL_CONECT;
const PORT = process.env.PORT;

mongoose.connect(URL_CONECTION)
    .then(() => console.log('Connected to mongoDB!'))
    .catch((err) => console.log(err));

app.listen(PORT, ()=>{
    console.log("Server running on port 3000");
})
app.get("/", (req, res)=>{
    res.send("Hello World");
    
})
app.post('/products', async (req, res)=>{
    try {
        const products =await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
app.post('/product/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const products =await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
app.post('/product', async (req, res)=>{
    try {
        const product =await Product.create(req.body);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('/product/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const products =await Product.findByIdAndUpdate(id, req.body);
        if(!products) {
            return res.status(404).json({message: `Product with id ${id} not found`})
        }
        const productUpdate = await Product.findById(id);
        res.status(200).json(productUpdate)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
app.delete('/product/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const products =await Product.findByIdAndDelete(id);
        if(!products) {
            return res.status(404).json({message: `Product with id ${id} not found`})
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})