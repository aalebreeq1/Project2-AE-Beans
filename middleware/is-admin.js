const isAdmin = (req, res, next) => {

  if (req.session && req.session.user && req.session.user.role === "admin") {
    return next();
  }
  
  req.session.errorMessage = "You must be an admin to access this page.";
  return res.redirect("/"); 
};

module.exports = isAdmin;