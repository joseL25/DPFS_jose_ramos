const fs = require("fs");
const path = require("path");

const modelsPath = path.join(__dirname, '..', 'data', 'products.json');

module.exports = {
    product: (req, res) => {
        let models = JSON.parse(fs.readFileSync(modelsPath, 'utf-8'));
        const modelFound = models.find((model) => model.id == req.params.id);
        
        // let products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
        // let prodFound = products.find((prod) => prod.id == req.params.id);
        
        res.render('products/detail', { modelFound });
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
    edit: (req, res) => {
        let models = JSON.parse(fs.readFileSync(modelsPath, 'utf-8'));
        let modelEdit = models.find((model) => model.id == req.params.id);

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
    destroy:(req,res)=>{
        //1. traer el listado de productos en una variable
        let models = JSON.parse(fs.readFileSync(modelsPath, 'utf-8'));
        //2. eliminar la imagen
        let modelToDelete = models.find((model) => model.id == req.params.id);
        if (modelToDelete.image != "default.png") {
            fs.unlinkSync(path.join(__dirname,`../public/images/modelos/${modelToDelete.imagen}`));
        }
        //3. actualizar el listado excluyendo el que coincide con el id a eliminar
        models = models.filter((model) => model.id != req.params.id);
        //4. reescribir el json
        fs.writeFileSync(modelsPath, JSON.stringify(models,null," "));
        //5. redireccionar
        res.redirect('/');
    }
}
