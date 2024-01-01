const productModel = require('../models/product.model')
const userModel = require('../models/user.model')
const saveImgMiddleware = require('../middleware/saveImgMiddleware')

const getAllProducts = async (req, res) => {
  const allProducts = await productModel.getAll() 

  const products = allProducts.map((product) => ({
    id : product.id,
    itemCategory : product.itemCategory,
    brand : product.brand,
    price : product.price,
    description: product.description,
    foto : product.foto,
    isSold : product.isSold
  }))

  const context = {
    products
  }

  return res.status(200).render('products/dashboardProducts', { context })
}

const getUserProducts = async (req, res) => {
  const user = await userModel.findByEmail(req.session.email)
  const userProducts = await productModel.getUserProducts(user.id)

  const products = userProducts.map((product) => ({
    id : product.id,
    itemCategory : product.itemCategory,
    brand : product.brand,
    price : product.price,
    description: product.description,
    foto : product.foto,
    isSold : product.isSold
  }))

  const context = {
    products
  }
  return res.status(200).render('products/userProducts/userProducts', { context })
}

const addUserProduct = async (req, res) => {
  return res.status(200).render('products/userProducts/formAddUserProduct')
}

const postAddUserProduct = async (req, res) => {
  try {
    const { itemCategory, brand, price, description } = req.body
    const foto = req.file.filename

    const user = await userModel.findByEmail(req.session.email)

    const itemId = new Date()

    const year = itemId.getFullYear()
    const month = itemId.getMonth() + 1
    const date = itemId.getDate()
    const hours = itemId.getHours()
    const minutes = itemId.getMinutes()
    const seconds = itemId.getSeconds()
    const milliseconds = itemId.getMilliseconds()

    const id = `${year}${month}${date}${hours}${minutes}${seconds}${milliseconds}`

    const isSold = false

    await productModel.create({
      id, itemCategory, brand, price, description, foto, isSold,
      userID: user.id
    })

    return res.status(201).redirect('/user/account/userProducts')
  } catch (error) {
    console.error('Error in postAddUserProduct:', error)
    res.status(500).render('products/userProducts/userProducts', { error: 'Internal Server Error' })
  }
}

const updateUserProduct = async (req, res) => {
  try {
    const id = await req.params.id
    
    const product = await productModel.getOne(id)

    if (!product) {
      res.status(400).redirect('/user/account/userProducts')
    }

    const context = {
      id : product.id,
      itemCategory : product.itemCategory,
      brand : product.brand,
      price : product.price,
      description: product.description,
      foto : product.foto,
      isSold : product.isSold
    }

    return res.status(201).render('products/userProducts/formUpdateUserProduct', { context })

  } catch (error) {
    console.error('Error in updateUserProduct:', error)
    res.status(500).render('products/userProducts/userProducts', { error: 'Internal Server Error' })
  }
}

const postUpdateUserProduct = async (req, res) => {
  try {
    const { id, itemCategory, brand, price, description } = req.body
    const foto = req.file.filename

    if (!id) {
      res.status(400).json({ message : 'pekok e, barang e sopo iki ra ono gob....' })
    }

    await productModel.update(id, itemCategory, brand, price, description, foto)

    return res.status(201).redirect('/user/account/userProducts')

  } catch (error) {
    console.error('Error in postUpdateUserProduct:', error)
    res.status(500).render('products/userProducts/userProducts', { error: 'Internal Server Error' })
  }
}

const deleteUserProduct = async (req, res) => {
  try {
    const id = await req.params.id
    
    const product = await productModel.getOne(id)

    if (!product) {
      res.status(400).redirect('/user/account/userProducts')
    }

    await productModel.deleteUserProduct(id)

    return res.status(201).redirect('/user/account/userProducts')
  } catch (error) {
    console.error('Error in deleteUserProduct:', error)
    res.status(500).render('products/userProducts/userProducts', { error: 'Internal Server Error' })
  }
}

const detailUserProduct = async (req, res) => {
  try {
    const id = await req.params.id
    
    const product = await productModel.getOne(id)

    if (!product) {
      res.status(400).redirect('/user/account/userProducts')
    }

    const context = {
      id : product.id,
      itemCategory : product.itemCategory,
      brand : product.brand,
      price : product.price,
      description: product.description,
      foto : product.foto,
      isSold : product.isSold
    }

    return res.status(201).render('products/userProducts/detailUserProduct', { context })
  } catch (error) {
    console.error('Error in detailUserProduct:', error)
    res.status(500).render('products/userProducts/userProducts', { error: 'Internal Server Error' })
  }
}

const uploadMiddleware = saveImgMiddleware.uploadProductMiddleware

module.exports = {
  getAllProducts, getUserProducts, addUserProduct, postAddUserProduct, 
  uploadMiddleware, updateUserProduct, postUpdateUserProduct, deleteUserProduct, detailUserProduct
}