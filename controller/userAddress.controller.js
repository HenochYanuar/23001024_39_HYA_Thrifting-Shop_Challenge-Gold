const userModel = require('../models/user.model')
const userAddressModel = require('../models/userAddress.model')

const getUserAddress = async (req, res) => {
  const user = await userModel.findByEmail(req.session.email)
  const userAddress = await userAddressModel.getUserAddres(user.id)

  const addresses = userAddress.map((address) => ({
    id : address.id,
    province : address.province,
    regency : address.regency, 
    subdistrict : address.subdistrict, 
    postalCode : address.postalCode, 
    addressDetail : address.addressDetail
  }))

  const context = {
    addresses 
  }

  return res.status(200).render('user/userAddress', { context })

}

const addUserAddress = async (req, res) => {
  return res.status(200).render('user/formAddUserAddress')
}

const postAddUserAddress = async (req, res) => {
  try {
    const { province, regency, subdistrict, postalCode, addressDetail } = req.body

    const user = await userModel.findByEmail(req.session.email)

    const addressId = new Date()

    const year = addressId.getFullYear()
    const month = addressId.getMonth() + 1
    const date = addressId.getDate()
    const hours = addressId.getHours()
    const minutes = addressId.getMinutes()
    const seconds = addressId.getSeconds()
    const milliseconds = addressId.getMilliseconds()

    const id = `${year}${month}${date}${hours}${minutes}${seconds}${milliseconds}`

    await userAddressModel.create({
      id, province, regency, subdistrict, postalCode, addressDetail,
      userID: user.id
    })

    return res.status(201).redirect('/user/account/address')

  } catch (error) {
    console.error('Error in postAddUserAddress:', error)
    res.status(500).render('user/userAddress', { error: 'Internal Server Error' })
  }
}

const updateUserAddres = async (req, res) => {
  try {
    const id = await req.params.id
    
    const address = await userAddressModel.getOne(id)

    const context = {
      id : address.id,
      province : address.province,
      regency : address.regency,
      subdistrict : address.subdistrict,
      postalCode : address.postalCode,
      addressDetail : address.addressDetail,
      userID : address.userID
    }

    return res.status(200).render('user/formUpdateUserAddress',{ context })
    
  } catch (error) {
    console.error('Error in updateUserAddress:', error)
    res.status(500).render('user/userAddress', { error: 'Internal Server Error' })
    
  }
}

const postUpdateUserAddress = async (req, res) => {
  try {
    const { id, province, regency, subdistrict, postalCode, addressDetail, userID } = req.body

    if (!id) {
      req.res(400).json({ message : 'pekok e, alamat e sopo iki ra ono gob....' })
    }

    await userAddressModel.update(id, province, regency, subdistrict, postalCode, addressDetail, userID)

    return res.status(201).redirect('/user/account/address')

  } catch (error) {
    console.error('Error in postUpdateUserAddress:', error)
    res.status(500).render('user/userAddress', { error: 'Internal Server Error' })
  }
}

module.exports = {
  postAddUserAddress, addUserAddress, getUserAddress, updateUserAddres, postUpdateUserAddress
}