const productModel = require('../models/product.model')
const userModel = require('../models/user.model')
const saveImgMiddleware = require('../middleware/saveImgMiddleware')
const idCreator = require('../utils/idCreator')

const getAllProducts = async (req, res) => {
  const searchQuery = req.query.search

  let allProducts

  if (searchQuery) {
    allProducts = await productModel.getAllByQuery(searchQuery)
  } else {
    allProducts = await productModel.getAll()
  }

  const products = allProducts.map((product) => productModel.getProductObject(product));

  const context = {
    products
  }

  return res.status(200).render('products/dashboardProducts', { context })
}

const getUserProducts = async (req, res) => {
  try {
    const user = await userModel.findByEmail(req.session.email)
    let userProducts = await productModel.getUserProducts(user.id)

    let products = userProducts.map((product) => productModel.getProductObject(product))

    const context = {
      products,
      query: "all"
    }

    const query = req.query.type

    if (query === "forSale") {
      userProducts = await productModel.getForSaleProducts(user.id)
      products = userProducts.map((product) => productModel.getProductObject(product))
      const context = {
        products,
        query: "forSale"
      }
      return res.status(200).render('products/userProducts/userProducts', { context })

    } else if (query === "sold") {
      userProducts = await productModel.getSoldProducts(user.id)
      products = userProducts.map((product) => productModel.getProductObject(product))
      const context = {
        products,
        query: "sold"
      }
      return res.status(200).render('products/userProducts/userProducts', { context })

    } else if (query === "purchased") {
      userProducts = await productModel.getPurchasedProducts(user.id)
      products = userProducts.map((product) => productModel.getProductObject(product))
      const context = {
        products,
        query: "purchased"
      }
      return res.status(200).render('products/userProducts/userProducts', { context })

    } else if (query === "all") {
      return res.status(200).render('products/userProducts/userProducts', { context })

    } else {
      return res.status(200).redirect('/user/account/userProducts?type=all')
    }


  } catch (error) {
    console.error('Error in getUserProduct:', error)
    res.status(500).render('products/userProducts/userProducts', { error: 'Internal Server Error' })
  }
}

const addUserProduct = async (req, res) => {
  return res.status(200).render('products/userProducts/formAddUserProduct')
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
    res.status(500).render('products/userProducts/userProducts', { error: 'Internal Server Error' })
  }
}

const updateUserProduct = async (req, res) => {
  try {
    const id = await req.params.id

    const product = await productModel.getOne(id)

    if (!product) {
      res.status(400).redirect('/user/account/userProducts')
      return
    }

    const context = {
      id: product.id,
      itemCategory: product.itemCategory,
      item_name: product.item_name,
      brand: product.brand,
      price: product.price,
      description: product.description,
      foto: product.foto,
      isSold: product.isSold
    }

    return res.status(201).render('products/userProducts/formUpdateUserProduct', { context })

  } catch (error) {
    console.error('Error in updateUserProduct:', error)
    res.status(500).render('products/userProducts/userProducts', { error: 'Internal Server Error' })
  }
}

const postUpdateUserProduct = async (req, res) => {
  try {
    const { id, itemCategory, brand, price, description, item_name } = req.body
    const foto = req.file.filename

    if (!id) {
      res.status(400).json({ message: 'pekok e, barang e sopo iki ra ono gob....' })
      return
    }

    await productModel.update(id, item_name, itemCategory, brand, price, description, foto)

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
      return
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
      return
    }

    const context = {
      id: product.id,
      itemCategory: product.itemCategory,
      item_name: product.item_name,
      brand: product.brand,
      price: product.price,
      description: product.description,
      foto: product.foto,
      isSold: product.isSold
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