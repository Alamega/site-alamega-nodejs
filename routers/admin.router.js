const router = require("express").Router();
const userRepo = require("../resources/users/user.memory.repository");
const adminMiddleware = require("../middlewares/adminMiddleware");

const path = require("path");

router.get(["/admin.html", "admin"], adminMiddleware, async (req, res) => {
  res.render("admin/admin-panel.ejs");
});

router.get(["/user-editor.html", "/user-editor"], adminMiddleware, async (req, res) => {
  res.render("admin/user-editor.ejs", {
    users: await userRepo.getUsers(),
  });
});

router.get("/user-page", adminMiddleware, async (req, res) => {
  const user = await userRepo.getUser(req.query.userId);
  res.render("admin/user-page.ejs", { user: user });
});

router.post("/changeRole", adminMiddleware, async (req, res) => {
  const user = await userRepo.getUser(req.body.userId);
  await userRepo.updateUser(user.id, user.username, user.password, req.body.role);
  res.redirect("/user-page?userId=" + user.id);
});

router.post("/addUser", adminMiddleware, async (req, res) => {
  await userRepo.createUser(req.body.username, req.body.password, ["USER"]);
  res.redirect("/admin.html");
});

router.post("/deleteUser", adminMiddleware, async (req, res) => {
  await userRepo.deleteUser(req.body.id);
  res.redirect("/user-editor");
});

router.get("/files.html", adminMiddleware, async (req, res) => {
  res.render("files.ejs", { msg: "" });
});

router.post("/upload", adminMiddleware, (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.redirect("files.html");
  } else {
    req.files.sampleFile.mv(path.join(__dirname, "../") + "/files/" + req.files.sampleFile.name, () => {
      res.render("files.ejs", { msg: "Файл загружен" });
    });
  }
});

module.exports = router;
