const isSignedIn = require("./is-signed-in.js");
const isAdmin = (req, res, next) => {
  if (isSignedIn(req) && req.session.user.role === "admin") {
    return next()
  }
  req.session.errorMessage = "You must be an admin to access this page."
  res.redirect("/homepage.ejs")
};

module.exports = isAdmin
