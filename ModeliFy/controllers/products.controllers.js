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
    }
}
