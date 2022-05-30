const router = require("express").Router();
const authController = require("../controllers/authController");
const userRepo = require("../resources/users/user.memory.repository");

async function setAdmin(username) {
  const admin = await userRepo.getUserByUsername(username);
  if (admin) {
    await userRepo.updateUser(admin.id, admin.username, admin.password, "ADMIN");
  }
}

router.get(["/", "/index.html"], async (req, res) => {
  setAdmin("Alamega");
  const user = await authController.getUserByToken(req);
  res.render("index.ejs", { user: user });
});

router.get("/hello.html", (req, res) => {
  res.render("hello.ejs");
});

router.get("/RSA.html", (req, res) => {
  res.render("RSA.ejs");
});

router.get("/GAME.html", (req, res) => {
  res.render("game.ejs");
});

router.get("/user", async (req, res) => {
  const user = await userRepo.getUser(req.query.userId);
  if (user) {
    res.render("user.ejs", { user: user });
  } else {
    res.redirect("/error404");
  }
});

module.exports = router;
