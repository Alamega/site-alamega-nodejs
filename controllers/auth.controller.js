const userRepo = require("../resources/users/user.memory.repository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getToken = (id, username, role) => {
  const payLoad = { id, username, role };
  return jwt.sign(payLoad, "SEKRETIK", { expiresIn: "24h" });
};

class authController {
  async registration(req) {
    const { username, password } = req.body;
    const messages = [];
    let code;
    //Ошибки
    if (username.length > 20 || username.length < 5) {
      messages.push("Имя пользователя должно быть длиннее 4 и короче 20 символов.");
    }
    if (password.length > 20 || password.length < 5) {
      messages.push("Пароль должен быть длиннее 4 и короче 20 символов.");
    }
    if (await userRepo.getUserByUsername(username)) {
      messages.push("Пользователь с таким именем пользователя уже существует.");
    }

    //Если ошибок нету
    if (messages.length == 0) {
      const hashPassword = bcrypt.hashSync(password, 7);
      await userRepo.createUser(username, hashPassword, "USER");
      messages.push("Регистрация прошла успешно ");
      code = "SUCCESS";
    } else {
      code = "ERROR";
    }

    return { code: code, messages: messages };
  }

  async login(req, res) {
    const { username, password } = req.body;
    const user = await userRepo.getUserByUsername(username);
    const messages = [];

    //Ошибки
    if (!user) {
      messages.push("Пользователя с таким именем не существует.");
      return { code: "ERROR", messages: messages };
    }
    if (!(await bcrypt.compare(password, user.password))) {
      messages.push("Введен неверный пароль.");
      return { code: "ERROR", messages: messages };
    }
    const token = getToken(user.id, user.username, user.role);
    res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 }); // Токен будет существовать 24 часа
    return { code: "SUCCESS", messages: messages };
  }

  async getUserByToken(req) {
    if (req.cookies.token) {
      try {
        return jwt.verify(req.cookies.token, "SEKRETIK");
      } catch (e) {
        return null;
      }
    }
    return null;
  }
}

module.exports = new authController();
