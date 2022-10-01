const errHandler = (err, req, res, next) => {
  let status, message;

  switch (err.name) {
    case "InvalidEmailPassword":
      status = 400;
      message = "invalid username or email or password.";
      break;
    case "InvalidUser":
      status = 400;
      message = "Email or password invalid.";
      break;
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      status = 400;
      message = err.errors.map((el) => el.message);
      break;
    case "NotFound":
      status = 404;
      message = "Data was not found.";
      break;
    case "Unauthenticated":
      status = 401;
      message = "Unauthenticated.";
      break;
    case "InvalidToken":
      status = 400;
      message = "access_token is required.";
      break;
    default:
      status = err.status || 500;
      message = err.message || "Internal Server Error.";
  }

  res.status(status).json({ message });
};

module.exports = errHandler;
