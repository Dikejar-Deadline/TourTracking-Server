module.exports = (err, req, res, next) => {
  let status = err.statusCode || 500;
  let message = err.message;

  switch (err.name) {
    // auth
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

    // destionation
    case "RequiredDestinationId":
      status = 400;
      message = "Destination id is required";
      break;
    case "MissingDestination":
      status = 404;
      message = "Destination not found";
      break;

    // Room
    case "RequiredRoomId":
      status = 400;
      message = "Room id is required";
      break;
    case "AlreadyJoin":
      status = 400;
      message = "Already join another room";
      break;
    case "MissingRoom":
      status = 404;
      message = "Room not found";
      break;

    // validation
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
