const isAdmin = (req, res, next) => {
  if (req.session.user.role === "admin") return next();
  req.session.errorMessage = 'You must be an admin to access this page.'
  res.redirect("/auth/sign-in");
};

module.exports = isAdmin;
