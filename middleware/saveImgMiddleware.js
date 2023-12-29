const multer = require('multer')
const path = require('path')

const userFotoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/users/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + 'User' + '-' + Date.now() + path.extname(file.originalname))
  }
})

const productFotoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/products/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + 'Products' + '-' + Date.now() + path.extname(file.originalname))
  }
})

const uploadUser = multer({ storage : userFotoStorage })
const uploadProduct = multer({ storage : productFotoStorage  })

module.exports = { 
  uploadUserMiddleware: uploadUser.single('foto'),
  uploadProductMiddleware: uploadProduct.single('foto')
 }