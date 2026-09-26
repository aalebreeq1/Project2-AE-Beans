const passUserToView = (req, res, next) => {
  res.locals.user = req.session.user ? req.session.user : null;
  res.locals.isAdmin = req.session.user && req.session.user.role === "admin";

  res.locals.errorMessage = req.session.errorMessage
    ? req.session.errorMessage
    : null;
  req.session.errorMessage = null;

  next();
};

module.exports = passUserToView;
