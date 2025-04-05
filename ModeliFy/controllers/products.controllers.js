const fs = require("fs");
const path = require("path");
const db = require("../database/models");


const modelsPath = path.join(__dirname, '..', 'data', 'products.json');

module.exports = {
    product: async(req, res) => {
        try {
            const modelFound = await db.Product.findByPk(req.params.id);
            
            res.render('products/detail', { modelFound });  
        } catch (error) {
            console.log(error);
        }
    },
    create: (req, res) => {
        // let models = JSON.parse(fs.readFileSync(modelsPath,'utf-8'));
        res.render("products/create");
    },
    save: (req, res) => {
        let models = JSON.parse(fs.readFileSync(modelsPath, 'utf-8'));
        // let lastModel = models.pop();
        // models.push(lastModel);

        let newModel = {
            id: models.length + 1,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            file: req.body.file,
            imagen: req.file.filename || "default.png"
        };

        models.push(newModel);

        fs.writeFileSync(modelsPath, JSON.stringify(models, null, " "));

        res.redirect("/");
    },
    edit: async(req, res) => {
        // let models = JSON.parse(fs.readFileSync(modelsPath, 'utf-8'));
        let modelEdit = await db.Product.findByPk(req.params.id)

        res.render("products/edit",{modelEdit});
    },
    update:(req,res)=>{
        let models = JSON.parse(fs.readFileSync(modelsPath, 'utf-8'));
        let modelEdit = models.find((model) => model.id == req.params.id);

        modelEdit.name = req.body.name || modelEdit.name;
        modelEdit.description = req.body.description || modelEdit.description;
        modelEdit.price = req.body.price || modelEdit.price;
        modelEdit.category = req.body.category || modelEdit.category;
        modelEdit.file = req.body.file || modelEdit.file;
        modelEdit.imagen = req.file?.filename || modelEdit.imagen;

        fs.writeFileSync(modelsPath, JSON.stringify(models,null, " "));
        res.redirect('/');
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
