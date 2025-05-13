// const fs = require("fs");
// const path = require("path");
const db = require('../database/models');
const { Op } = require('sequelize');

// const modelsPath = path.join(__dirname,'..','data','products.json');

const indexController = {
    gethome: async(req,res)=>{
        try {
            const models = await db.Product.findAll(
                {include:["categories","files"]}
            );
            // console.log(productsDB);
    
            res.render("home.ejs",{ models }); 
        } catch (error) {
            console.log(error);
        }
    },
    searchProduct: async(req,res)=>{
        try {
            const models = await db.Product.findAll(
                {include:["categories","files"]}
            );

            const modelSearch = req.body?.productSearch.trim() || '';
            const modelResult = []

            if (!modelSearch) {
                return res.render('MPS', { modelResult: [] });
            }

            models.forEach(model => {
                if(modelSearch == model.name){

                }
            });

            res.render('MPS', {modelResult});
        } catch (error) {
            console.log(error);
            
        }
    }
}

module.exports = indexController;