const handle = (req, res, next) => {
  if (req.session.id === undefined || req.session.id === null) {
      return res.redirect('/user/login')
  }
  return next()
}

module.exports = handle