const fs = require("fs");
const path = require("path");

const modelsPath = path.join(__dirname,'..','data','products.json');

module.exports = {
    product: (req,res)=>{
        const models = JSON.parse(fs.readFileSync(modelsPath,'utf-8'));
        const modeloSeleccionado = models.find((model)=> model.id == 1);
        
        res.render('product.ejs',{ modeloSeleccionado });
    }
}