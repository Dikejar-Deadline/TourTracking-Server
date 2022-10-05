const { hashPassword, comparePassword } = require("./../helper/bcrypt");
const { createToken } = require("../helper/jwt");
const { User } = require("./../models");

class AuthController {
  static async index(req, res, next) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  static async byToken(req, res, next) {
    try {
      const user = await User.findByPk(+req.user.id, {
        // attributes: { exclude: ["password"] },
      });
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const {
        firstName,
        lastName,
        username,
        email,
        password,
        phoneNumber,
        address,
      } = req.body;

      let user = {};
      if (email) {
        user = await User.findOne({
          where: {
            email,
          },
        });
        if (user) throw { name: "EmailExist" };
      }
      user = await User.create({
        firstName,
        lastName,
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      user.update({
        password: hashPassword(password),
      });
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw { name: "EmptyEmailPassword" };
      let user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) throw { name: "InvalidCredentials" };
      if (!comparePassword(password, user.password))
        throw { name: "InvalidCredentials" };
      res.json(
        createToken({ id: user.id, email: user.email, role: user.role })
      );
    } catch (error) {
      next(error);
    }
  }

  static async loginGoogle(req, res, next) {
    const client = new OAuth2Client(process.env.G_CLIENT_ID);

    const { idToken } = req.body;

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.G_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    let result = await User.findOne({ where: { email: payload.email } });

    if (!result) {
      result = await User.create(
        {
          username: payload.given_name,
          email: payload.email,
          password: "loginGoogle",
          phoneNumber: "-",
        },
        { hooks: false }
      );
    }

    let access_token = createToken({ id: result.id });

    res.status(200).json({ result, access_token });
  }
}

module.exports = AuthController;
