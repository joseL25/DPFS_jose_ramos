const fs = require("fs");
// const path = require("path");
const db = require("../database/models");
// const {where} = require('sequelize');
const { validationResult } = require('express-validator');
const { log } = require("console");


// const modelsPath = path.join(__dirname, '..', 'data', 'products.json');

module.exports = {
    product: async(req, res) => {
        try {
            const modelFound = await db.Product.findByPk(req.params.id);
            
            res.render('products/detail', { modelFound });  
        } catch (error) {
            console.log(error);
        }
    },
    create: async(req, res) => {
        const categories = await db.Category.findAll();
        const files = await db.File.findAll();
        res.render("products/create",{categories, files});
    },
    save: async(req, res) => {
        try {
            const categories = await db.Category.findAll();
            const files = await db.File.findAll();
            const resultValidator = validationResult(req);
            if(resultValidator.isEmpty()){
                let newModel = {
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    category_id: req.body.category,
                    file_id: req.body.file,
                    image: req.file?.filename || "default.png"
                };
                await db.Product.create(newModel)
        
                res.redirect("/");

            } else{
                return res.render('products/create',{
                    errors: resultValidator.mapped(), 
                    old: req.body, categories, files
                });
            }
            
        } catch (error) {
            console.log(error);
            
        }
    },
    edit: async(req, res) => {
        try {
            const categories = await db.Category.findAll();
            const files = await db.File.findAll();
            let modelEdit = await db.Product.findByPk(req.params.id)
    
            res.render("products/edit",{modelEdit, files, categories});
        } catch (error) {
            console.log(error);
            
        }
    },
    update:async(req,res)=>{
        try {
            let modelEdit = await db.Product.findByPk(req.params.id);
            const categories = await db.Category.findAll();
            const files = await db.File.findAll();
            const resultValidator = validationResult(req);
            if(resultValidator.isEmpty()){
                // let modelEdit = await db.Product.findByPk(req.params.id);
                let modUpdate = {
                    name: req.body.name || modelEdit.name,
                    description: req.body.description || modelEdit.description,
                    price: req.body.price || modelEdit.price,
                    category_id: req.body.category || modelEdit.category_id,
                    file_id: req.body.file || modelEdit.file_id,
                    image: req.file?.filename || modelEdit.image,
                }
        
                await db.Product.update(modUpdate, {
                    where:{
                        id: req.params.id
                    }
                })
                res.redirect('/');
            } else{
                return res.render('products/edit',{
                    errors: resultValidator.mapped(), 
                    old: req.body, categories, files, modelEdit
                });
            }

        } catch (error) {
            console.log(error);
        }
    },
    destroy:async(req,res)=>{
        //OPCIONAL
        // let modelToDelete = await db.Product.findByPk(req.params.id);
        // if (modelToDelete.image != "default.png") {
        //     fs.unlinkSync(path.join(__dirname,`../public/images/modelos/${modelToDelete.imagen}`));
        // }
        try {
            const modelDelete = await db.Product.destroy({
                where: {
                    id: req.params.id
                }
            })
            console.log('modelo borrado', modelDelete);
            //5. redireccionar
            res.redirect('/');
        } catch (error) {
            console.log(error);
            
        }

    }
}
