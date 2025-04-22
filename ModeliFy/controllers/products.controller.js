const fs = require("fs");
// const path = require("path");
const db = require("../database/models");
// const {where} = require('sequelize');


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
    },
    edit: async(req, res) => {
        const categories = await db.Category.findAll();
        const files = await db.File.findAll();
        let modelEdit = await db.Product.findByPk(req.params.id)

        res.render("products/edit",{modelEdit, files, categories});
    },
    update:async(req,res)=>{
        try {
            let modelEdit = await db.Product.findByPk(req.params.id);
    
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
        const modelDelete = await db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
        console.log('modelo borrado', modelDelete);
        //5. redireccionar
        res.redirect('/');
    }
}
