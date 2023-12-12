const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true, $data: true });
require("ajv-formats")(ajv);
require("ajv-errors")(ajv);
const Logger = require("../helpers/logger");
const UserService = require("../services/user/userService");
ajv.addFormat("mobileNumber", /^\d{10}$/);

const schema = {
  type: "object",
  properties: {
    username: {
      type: "string",
      minLength: 6,
      errorMessage: "Username must be at least 6 characters long",
    },
    firstName: {
      type: "string",
      maximum: 100,
      errorMessage: "First name must be between 1 and 100 characters long",
    },
    lastName: {
      type: "string",
      maximum: 100,
      errorMessage: "Last name must be between 1 and 100 characters long",
    },
    password: {
      type: "string",
      minLength: 8,
      maxLength: 100,
      errorMessage: "Password must be between 8 and 100 characters long",
    },
    email: {
      type: "string",
      format: "email",
      errorMessage: "Invalid email address",
    },
    mobileNumber: {
      type: "string",
      format: "mobileNumber",
      errorMessage: "Invalid mobile number",
    },
  },
  required: ["username", "firstName", "lastName", "email", "mobileNumber"],
  additionalProperties: false,
};

/**
 * Middleware function to validate the request body against a given schema using the AJV library.
 *
 * @param {Object} req - The request object containing the data to be validated.
 * @param {Object} res - The response object used to send a response back to the client.
 * @param {Function} next - A function to call to pass control to the next middleware function.
 * @returns {void}
 */
function ajvMiddleware(req, res, next) {
  const data = req.body;

  const isValid = ajv.validate(schema, data);

  if (!isValid) {
    const errors = ajv.errors;
    Logger.error(`Invalid data: ${JSON.stringify(errors)}`);
    return res.status(400).json({ errors });
  }
  Logger.info("Data is valid");
  next();
}

/**
 * Checks if a user with the given email, username, or mobile number already exists in the database.
 * If any of these fields already exist, it logs an error message and returns a response with the corresponding error message.
 *
 * @param {Object} req - The request object containing the user data.
 * @param {Object} res - The response object to send the error message.
 * @param {Function} next - The next middleware function to call.
 * @returns {void}
 */

async function checkExistingUser(req, res, next) {
  const userService = new UserService();
  const existingEmail = await userService.findByEmail(req.body.email);
  const existingUsername = await userService.findByUsername(req.body.username);
  const existingMobileNumber = await userService.findByMobileNumber(
    req.body.mobileNumber
  );
  if (existingEmail || existingUsername || existingMobileNumber) {
    let errorMessage = "";

    if (existingEmail) {
      Logger.info(`POST /api/users - email: ${req.body.email} already exists!`);
      errorMessage = "The given email address already exists!";
    } else if (existingUsername) {
      Logger.info(
        `POST /api/users - username: ${req.body.username} already exists!`
      );
      errorMessage = "The given username already exists!";
    } else if (existingMobileNumber) {
      Logger.info(
        `POST /api/users - mobileNumber: ${req.body.mobileNumber} already exists!`
      );
      errorMessage = "The given mobile number already exists!";
    }

    return res.status(400).json({ error: errorMessage });
  }
  next();
}

module.exports = { ajvMiddleware, checkExistingUser };
