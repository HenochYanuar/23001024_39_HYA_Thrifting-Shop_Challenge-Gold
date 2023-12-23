const productModel = require('../models/product.model')
const userModel = require('../models/user.model')

const getAllProducts = async (req, res) => {
  const user = await userModel.findByEmail(req.session.email)
  res.status(200).render('product/dashboardProduct', {context : user})
}

module.exports = {
  getAllProducts
}