const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");

class Controller {
  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      if (!email || !password) throw { name: "InvalidEmailPassword" };

      let result = await User.findOne({ where: { email } });
      if (!result || !comparePassword(password, result.password)) throw { name: "InvalidUser" };

      let id = result.id;
      let access_token = generateToken({ id });

      res.status(200).json({ result, access_token });
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      let { username, email, password, phoneNumber } = req.body;
      let input = { username, email, password, phoneNumber };

      let result = await User.create(input);
      let access_token = generateToken({ id: result.id });
      res.status(201).json(result, access_token);
    } catch (err) {
      next(err);
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

    let access_token = generateToken({ id: result.id });

    res.status(200).json({ result, access_token });
  }
}

module.exports = Controller;
