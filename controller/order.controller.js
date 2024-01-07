const userModel = require('../models/user.model')
const productModel = require('../models/product.model')
const orderModel = require('../models/order.mode')

const checkout = async (req, res) => {
  try {
    const user = await userModel.findByEmail(req.session.email)
    const userID = user.id
    const id = await req.params.id
    
    const product = await productModel.getOne(id)

    if (!product) {
      res.status(400).redirect('/')
      return
    }

    if (product.userID === userID) {
      res.status(200).redirect(`/user/account/userProducts/detail/${product.id}`)
      return
    }

    const context = {
      id : product.id,
      itemCategory : product.itemCategory,
      item_name : product.item_name,
      brand : product.brand,
      price : product.price,
      description: product.description,
      foto : product.foto,
      isSold : product.isSold
    }

    return res.status(201).render('products/buyProduct', { context })
  } catch (error) {
    console.error('Error in buyProduct:', error)
    res.status(500).render('products/dashboardProducts', { error: 'Internal Server Error' })
  }
}

const buyProduct = async (req, res) => {
  try {
    
    const goodsID = await req.params.id
    
    const product = await productModel.getOne(goodsID)
    
    if (!product) {
      res.status(400).redirect('/')
      return
    }

    const user = await userModel.findByEmail(req.session.email)
    const userID = user.id

    const itemId = new Date()

    const year = itemId.getFullYear()
    const month = itemId.getMonth() + 1
    const date = itemId.getDate()
    const hours = itemId.getHours()
    const minutes = itemId.getMinutes()
    const seconds = itemId.getSeconds()
    const milliseconds = itemId.getMilliseconds()

    const id = `${year}${month}${date}${hours}${minutes}${seconds}${milliseconds}`

    await orderModel.buyProduct({ id, userID, goodsID })

    // const isSold = true
    await productModel.isSoldUpdate(goodsID)

    res.status(201).redirect('/user/account/userProducts')

  } catch (error) {
    
  }
}

module.exports = {
  buyProduct, checkout
}