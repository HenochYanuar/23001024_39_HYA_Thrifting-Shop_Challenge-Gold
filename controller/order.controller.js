const userModel = require('../models/user.model')
const userBioModel = require('../models/userBio.model')
const userAddressModel = require('../models/userAddress.model')
const productModel = require('../models/product.model')
const orderModel = require('../models/order.model')
const idCreator = require('../utils/idCreator')


const layout = 'layouts/baseLayout'

const err404 = {
  message : '404 | Item Not Found',
  layout : 'error/error'
}

const err500 = {
  message : '500 | Internal Server Error',
  layout : 'error/error'
}

const checkout = async (req, res) => {
  try {
    const session = await userModel.findByEmail(req.session.email)
    const userID = session.id
    const id = await req.params.id

    const userBio = await userBioModel.findByUserId(userID)
    const userAddress = await userAddressModel.getUserAddres(userID)
    const product = await productModel.getOne(id)
    const sellerBio = await userModel.findById(product.userID)
    const sellerAddress = await userAddressModel.getUserAddres(sellerBio.id)

    if (!product) {
      res.status(400).redirect('/')
      return
    }

    if (product.userID === userID) {
      res.status(200).redirect(`/user/account/userProducts/detail/${product.id}`)
      return
    }

    const context = {
      product, session, userBio, userAddress, sellerBio, sellerAddress
    }

    const title = 'Thrifting Shop | Checkout Barang dan Pastikan Sesuai Dengan Harapan Anda '

    return res.status(200).render('products/buyProduct', { context, title , layout })
  } catch (error) {
    console.error('Error in buyProduct:', error)
    res.status(500).render('products/dashboardProducts', err500)
  }
}

const buyProduct = async (req, res) => {
  try {
    
    const goodsID = await req.params.id
    
    const product = await productModel.getOne(goodsID)
    
    if (!product) {
      res.status(404).render('error/error', err404)
      return
    }

    const user = await userModel.findByEmail(req.session.email)
    const userID = user.id

    const id = await idCreator.createID()

    await orderModel.buyProduct({ id, userID, goodsID })

    await productModel.isSoldUpdate(goodsID)

    res.status(201).redirect('/user/account/userProducts?type=purchased')

  } catch (error) {
    
  }
}

module.exports = {
  buyProduct, checkout
}