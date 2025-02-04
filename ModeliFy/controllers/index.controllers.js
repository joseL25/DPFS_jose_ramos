const fs = require("fs")
const path = require("path")

const modelsPath = path.join(__dirname,'..','data','products.json')

const indexController = {
    gethome:(req,res)=>{

        console.log(JSON.parse(fs.readFileSync(modelsPath,'utf-8')))
        const models = JSON.parse(fs.readFileSync(modelsPath,'utf-8'));

        res.render("home.ejs",{ models }); 
    }
}

module.exports = indexController;