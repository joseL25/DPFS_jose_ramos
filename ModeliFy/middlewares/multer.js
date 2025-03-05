const multer = require("multer");
const path = require("path");

const storageProd = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images/modelos') )
  },
  filename: function (req, file, cb) {
  //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const uniqueSuffix = 'mod-' + Date.now() + path.extname(file.originalname);
  //   cb(null, 'modelo' + '-' + uniqueSuffix)
    cb(null, uniqueSuffix);
  }
})

const storageUser = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images/avatar/profiles') )
  },
  filename: function (req, file, cb) {
  //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const uniqueSuffix = 'avatar-' + Date.now() + path.extname(file.originalname);
  //   cb(null, 'modelo' + '-' + uniqueSuffix)
    cb(null, uniqueSuffix);
  }
})

const uploadProd = multer({ storage: storageProd });
const uploadUser = multer({ storage: storageUser });

module.exports = {uploadProd, uploadUser};