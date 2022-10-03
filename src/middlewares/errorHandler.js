module.exports = (err, req, res, next) => {
  let status = err.statusCode || 500;
  let message = err.message;

  switch (err.name) {
    // User and auth
    case "MissingToken":
      status = 400;
      message = "Authorization token is required";
      break;
    case "InvalidToken":
      status = 401;
      message = "Invalid authorization token";
      break;
    case "MissingUserId":
      status = 400;
      message = "User id is required";
      break;
    case "Unauthorized":
      status = 401;
      message = "Unauthorized";
      break;

    // destionation
    case "RequiredDestinationId":
      status = 400;
      message = "Destination id is required";
      break;
    case "MissingDestination":
      status = 404;
      message = "Destination not found";
      break;

    // Product
    case "RequiredRoomId":
      status = 400;
      message = "Room id is required";
      break;
    case "MissingRoom":
      status = 404;
      message = "Room not found";
      break;

    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      status = 400;
      message = err.errors.map((el) => el.message);
      break;

    default:
      break;
  }

  res.status(status).json({ message });
};
