const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true, $data: true});
const Logger = require('../helpers/logger');

const schema = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
            minLength: 6,
            errorMessage: 'Username must be at least 6 characters long'
        },
        firstName: {
            type: 'string',
            maximum: 100,
            errorMessage: 'First name must be between 1 and 100 characters long'
        },
        lastName: {
            type: 'string',
            maximum: 100,
            errorMessage: 'Last name must be between 1 and 100 characters long'
        },
        email: {
            type: 'string',
            format: 'email',
            errorMessage: 'Invalid email address'
        },
        mobileNumber: {
            type: 'string',
            format: 'mobile_number',
            errorMessage: 'Invalid mobile number'
        }
    },
    required: ['name', 'firstName', "lastName", 'email', 'mobileNumber',],
    additionalProperties: false,
};

function ajvMiddleware(req, res, next) {
    const data = req.body;

    const isValid = ajv.validate(schema, data);

    if (!isValid) {
        const errors = ajv.errors;
        Logger.error(`Invalid data: ${JSON.stringify(errors)}`);
        return res.status(400).json({errors});
    }
    Logger.info('Data is valid');
    next();
}

module.exports = ajvMiddleware;
