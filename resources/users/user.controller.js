const userRepo = require("./user.memory.repository");

class UserController {
  async createUser(req, res) {
    const { username, password, roles } = req.body;
    res.json(await userRepo.createUser(username, password, roles));
  }

  async getUsers(req, res) {
    res.json(await userRepo.getUsers());
  }

  async getUser(req, res) {
    res.json(await userRepo.getUser(req.params.id));
  }

  async updateUser(req, res) {
    const { id, username, password, roles } = req.body;
    res.json(await userRepo.updateUser(id, username, password, roles));
  }

  async deleteUser(req, res) {
    res.json(await userRepo.deleteUser(req.params.id));
  }
}

module.exports = new UserController();
