module.exports = (err, req, res, next) => {
  let status = 500;
  let message = "";

  switch (err.name) {
    // input
    case "EmailExist":
      status = 400;
      message = "Email already exist";
      break;
    // auth
    case "InvalidCredentials":
      status = 400;
      message = "Invalid credentials";
      break;
    case "MissingToken":
      status = 400;
      message = "Authorization token is required";
      break;
    case "InvalidToken":
      status = 401;
      message = "Invalid authorization token";
      break;
    case "Unauthorized":
      status = 401;
      message = "Unauthorized";
      break;

    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      status = 400;
      message = err.errors.map((el) => el.message);
      break;

    default:
      status = 500;
      message = err.message;
      break;
  }

  res.status(status).json({ message });
};
