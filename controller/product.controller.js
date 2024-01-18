const productModel = require('../models/product.model')
const userModel = require('../models/user.model')
const userBioModel = require('../models/userBio.model')
const userAddressModel = require('../models/userAddress.model')
const orderModel = require('../models/order.model')
const saveImgMiddleware = require('../middleware/saveImgMiddleware')
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

const getAllProducts = async (req, res) => {
  let searchQuery = req.body
  searchQuery = req.query.search
  const session = req.session.email

  const allProducts = searchQuery ? await productModel.getAllByQuery(searchQuery) : await productModel.getAll()

  const products = allProducts.map(product => productModel.getProductObject(product))
  const context = { 
    products, session 
  }

  if (session) {
    let user = await userModel.findByEmail(session)
    context.userBio = await userBioModel.findByUserId(user.id)
  }

  const title = 'Thrifting Shop | Situs Belanja Barang Muarh & Bekas'

  res.status(200).render('products/dashboardProducts', { context, title, layout })
}

const getUserProducts = async (req, res) => {
  try {
    const session = await userModel.findByEmail(req.session.email)
    const userBio = await userBioModel.findByUserId(session.id)

    const userId = session.id
    const queryType = req.query.type || "all"

    let userProducts;

    switch (queryType) {
      case "forSale":
        userProducts = await productModel.getForSaleProducts(userId);
        break
      case "sold":
        userProducts = await productModel.getSoldProducts(userId);
        break
      case "purchased":
        userProducts = await productModel.getPurchasedProducts(userId);
        break
      case "all":
        userProducts = await productModel.getUserProducts(userId);
        break;
      default:
        return res.status(400).redirect('/user/account/userProducts?type=all')
    }

    const products = userProducts.map((product) => productModel.getProductObject(product))
    const userAddress = await userAddressModel.getUserAddres(userId)

    const context = {
      products, session, userBio, userAddress,
      query: queryType
    }

    const title = 'Thrifting Shop | Jual Barang Anda Sesuai Dengan Keinginan Anda'

    return res.status(200).render('products/userProducts/userProducts', { context, title, layout })

  } catch (error) {
    console.error('Error in getUserProduct:', error)
    res.status(500).render('error/error', err500)
  }
}

const addUserProduct = async (req, res) => {
  const session = await userModel.findByEmail(req.session.email)
  const userBio = await userBioModel.findByUserId(session.id)

  const context = {
    session, userBio
  }

  const title = 'Thrifting Shop | Tambahkan Jualan Anda, Barang Bekas Anda dll'

  return res.status(200).render('products/userProducts/formAddUserProduct', { context, title, layout })
}

const postAddUserProduct = async (req, res) => {
  try {
    const { itemCategory, brand, price, description, item_name } = req.body
    const foto = req.file.filename

    const user = await userModel.findByEmail(req.session.email)

    const id = await idCreator.createID()

    const isSold = false

    await productModel.create({
      id, itemCategory, brand, price, description, foto, isSold, item_name,
      userID: user.id
    })

    return res.status(201).redirect('/user/account/userProducts')
  } catch (error) {
    console.error('Error in postAddUserProduct:', error)
    res.status(500).render('error/error', err500)
  }
}

const updateUserProduct = async (req, res) => {
  try {
    const id = await req.params.id
    const session = await userModel.findByEmail(req.session.email)
    const userBio = await userBioModel.findByUserId(session.id)

    const product = await productModel.getOne(id)

    if (!product || product.isSold === true) {
      res.status(404).render('error/error', err404)
      return
    }

    const context = {
      product, session, userBio
    }

    const title = 'Thrifting Shop | Perbarui Barang Jualan Anda Agar Lebih Sesuai'

    return res.status(201).render('products/userProducts/formUpdateUserProduct', { context, title, layout })

  } catch (error) {
    console.error('Error in updateUserProduct:', error)
    res.status(500).render('error/error', err500)
  }
}

const postUpdateUserProduct = async (req, res) => {
  try {
    const { id, itemCategory, brand, price, description, item_name } = req.body
    const foto = req.file.filename

    if (!id) {
      res.status(404).render('error/error', err404)
      return
    } 

    await productModel.update(id, item_name, itemCategory, brand, price, description, foto)

    return res.status(201).redirect('/user/account/userProducts')

  } catch (error) {
    console.error('Error in postUpdateUserProduct:', error)
    res.status(500).render('error/error', err500)
  }
}

const deleteUserProduct = async (req, res) => {
  try {
    const id = await req.params.id

    const product = await productModel.getOne(id)

    if (!product || product.isSold === true) {
      res.status(404).render('error/error', err404)
      return
    }

    await productModel.deleteUserProduct(id)

    return res.status(201).redirect('/user/account/userProducts')
  } catch (error) {
    console.error('Error in deleteUserProduct:', error)
    res.status(500).render('error/error', err500)
  }
}

const detailUserProduct = async (req, res) => {
  try {
    const id = await req.params.id
    const session = await userModel.findByEmail(req.session.email)
    const userBio = await userBioModel.findByUserId(session.id)

    const product = await productModel.getOne(id)

    if (!product) {
      res.status(404).render('error/error', err404)
      return
    }
    
    const sellerBio = await userModel.findById(product.userID)
    const sellerAddress = await userAddressModel.getUserAddres(sellerBio.id)
    const buyerData = await orderModel.getProductByGoodsId(product.id)
    
    const title = 'Thrifting Shop | Detail Barang Anda'
    
    const context = {
      product, session, userBio, sellerBio, sellerAddress
    }

    if (!buyerData) {
      return res.status(201).render('products/userProducts/detailUserProduct', { context, title, layout })
    } 

    context.buyerBio = await userModel.findById(buyerData.userID)

    return res.status(201).render('products/userProducts/detailUserProduct', { context, title, layout })
  } catch (error) {
    console.error('Error in detailUserProduct:', error)
    res.status(500).render('error/error', err500)
  }
}

const uploadMiddleware = saveImgMiddleware.uploadProductMiddleware

module.exports = {
  getAllProducts, getUserProducts, addUserProduct, postAddUserProduct,
  uploadMiddleware, updateUserProduct, postUpdateUserProduct, deleteUserProduct, detailUserProduct
}