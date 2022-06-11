const authController = require("../controllers/auth.controller");

module.exports = async function (req, res, next) {
  const user = await authController.getUserByToken(req);
  if (user && user.role == "ADMIN") {
    next();
  } else {
    res.redirect("/authError.html");
  }
};
