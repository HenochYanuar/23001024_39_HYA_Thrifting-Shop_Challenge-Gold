const userModel = require('../models/user.model')
const userBioModel = require('../models/userBio.model')
const userAddressModel = require('../models/userAddress.model')
const idCreator = require('../utils/idCreator')


const layout = 'layouts/baseLayout'
const err404 = {
  message : '404 | Address Not Found',
  layout : 'error/error'
}

const err500 = {
  message : '500 | Internal Server Error',
  layout : 'error/error'
}

const getUserAddress = async (req, res) => {
  const session = await userModel.findByEmail(req.session.email)
  const userAddress = await userAddressModel.getUserAddres(session.id)
  const userBio = await userBioModel.findByUserId(session.id)

  const addresses = userAddress.map((address) => ({
    id: address.id,
    province: address.province,
    regency: address.regency,
    subdistrict: address.subdistrict,
    postalCode: address.postalCode,
    addressDetail: address.addressDetail
  }))

  const context = {
    addresses, session, userBio
  }

  const title = 'Thrifting Shop | Pastikan Alamat Anda Benar dan Terpercaya'

  return res.status(200).render('user/userAddress', { context, title, layout })

}

const addUserAddress = async (req, res) => {
  const session = await userModel.findByEmail(req.session.email)
  const userBio = await userBioModel.findByUserId(session.id)

  const context = {
    session, userBio
  }

  const title = 'Thrifting Shop | Tambahkan Alamat Terbaru Anda dan Pastikan Valid'

  return res.status(200).render('user/formAddUserAddress', { context, title, layout })
}

const postAddUserAddress = async (req, res) => {
  try {
    const { province, regency, subdistrict, postalCode, addressDetail } = req.body

    const user = await userModel.findByEmail(req.session.email)

    const id = await idCreator.createID()

    await userAddressModel.create({
      id, province, regency, subdistrict, postalCode, addressDetail,
      userID: user.id
    })

    return res.status(201).redirect('/user/account/address')

  } catch (error) {
    console.error('Error in postAddUserAddress:', error)
    res.status(500).render('error/error', err500)
  }
}

const updateUserAddres = async (req, res) => {
  try {
    const id = await req.params.id
    const session = await userModel.findByEmail(req.session.email)
    const userBio = await userBioModel.findByUserId(session.id)

    const address = await userAddressModel.getOne(id)

    if (!address) {
      res.status(404).render('error/error', err404)
      return
    }

    const context = {
      address, session, userBio
    }

    const title = 'Thrifting Shop | Perbarui Alamat Anda Dengan Alamat Yang Benar'

    return res.status(200).render('user/formUpdateUserAddress', { context, title, layout })

  } catch (error) {
    console.error('Error in updateUserAddress:', error)
    res.status(500).render('error/error', err500)

  }
}

const postUpdateUserAddress = async (req, res) => {
  try {
    const { id, province, regency, subdistrict, postalCode, addressDetail, userID } = req.body

    if (!id) {
      res.status(404).render('error/error', err404)
      return
    }

    await userAddressModel.update(id, province, regency, subdistrict, postalCode, addressDetail, userID)

    return res.status(201).redirect('/user/account/address')

  } catch (error) {
    console.error('Error in postUpdateUserAddress:', error)
    res.status(500).render('error/error', err500)
  }
}

const deleteUserAddress = async (req, res) => {
  try {
    const id = await req.params.id

    const address = await userAddressModel.getOne(id)

    if (!address) {
      res.status(404).render('error/error', err404)
      return
    }

    await userAddressModel.deleteUserAddress(id)

    return res.status(201).redirect('/user/account/address')

  } catch (error) {
    console.error('Error in deleteUserAddress:', error)
    res.status(500).render('error/error', err500)

  }
}

module.exports = {
  postAddUserAddress, addUserAddress, getUserAddress, updateUserAddres, postUpdateUserAddress, deleteUserAddress
}