const authHandle = (req, res, next) => {
  if (req.session && req.session.email) {
    next()
  } else {
    res.redirect('/user/login')
  }
}

module.exports = authHandle;