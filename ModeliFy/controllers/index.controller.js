// const fs = require("fs");
// const path = require("path");
const db = require('../database/models');

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
    // create:(req,res)=>{
    //     const models = JSON.parse(fs.readFileSync(modelsPath,'utf-8'));
    //     res.render("products/create.ejs");
    // }
}

module.exports = indexController;