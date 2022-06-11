const Router = require("express");
const userController = require("../users/user.controller");
const adminMiddleware = require("../../middlewares/adminMiddleware");

const router = new Router();

router.post("/users", adminMiddleware, userController.createUser);
router.get("/users", adminMiddleware, userController.getUsers);
router.get("/users/:id", adminMiddleware, userController.getUser);
router.put("/users", adminMiddleware, userController.updateUser);
router.delete("/users/:id", adminMiddleware, userController.deleteUser);

module.exports = router;
