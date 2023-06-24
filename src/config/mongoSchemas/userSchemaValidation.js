const Logger = require('../../helpers/logger');

const userSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["username", "firstName", "lastName", "email", "password", "mobileNumber"],
        additionalProperties: false,
        properties: {
            username: {
                bsonType: "string",
                maxLength: 75,
                description: "'username' is required and is a string"
            },
            firstName: {
                bsonType: "string",
                maximum: 75,
                maxLength: 75,
                description: "'first_name' is required and is a string"
            },
            lastName: {
                bsonType: "string",
                maximum: 75,
                maxLength: 75,
                description: "'last_name' is required and is a string"
            },
            email: {
                bsonType: "string",
                description: "'email' is required and is a string"
            },
            password: {
                bsonType: "string",
                description: "'password' is required and is a string"
            },
            mobileNumber: {
                bsonType: "string",
                maxLength: 10,
                description: "'mobile_number' is an optional field and is a string"
            },
            verified: {
                bsonType: "bool",
                description: "'verified' is an optional field and is a boolean"
            },
            verificationToken: {
                bsonType: "string",
                maxLength: 6,
                description: "'verification_token' is required and is a string"
            },
            activeStatus: {
                bsonType: "bool",
                enum: ["active", "inactive"],
                description: "Status with a default value of 'active' or 'inactive'."
            },
            oauthProfiles: {
                bsonType: "array",
                maxItems: 5,
                description: "'oauth_profiles' is an optional field and is an array"
            },
            acceptTerms: {
                bsonType: "array",
                maxItems: 5,
                enum: ["accepted", "not_accepted"],
                description: "'oauth_profiles' is an optional field and is an array"
            },
            createdAt: {
                bsonType: "date",
                description: "Creation date with a default value of the current date."
            },
            lastUpdatedAt: {
                bsonType: "date",
                description: "Creation date with a default value of the last updated date."
            }
        }
    }
};

async function createUserCollection(mongoDB) {
    try {
        await mongoDB.command({create: "users", validator: {$jsonSchema: userSchema.$jsonSchema}});
        Logger.info("Users collection created with schema validation.");
    } catch (error) {
        Logger.error(`Error creating users collection: ${error}`);
    }
}

async function migrateData(mongoDB, documentType) {
    try {
        const collection = mongoDB.collection('users');

        const cursor = collection.find();
        for (const document of cursor) {
            try {
                document[documentType] = '';
                await collection.save(document);
            } catch (error) {
                Logger.error(`Error migrating data for document with _id ${document._id}: ${error}`);
            }
        }

        Logger.info('Data migration completed.');
    } catch (error) {
        Logger.error(`Error during data migration: ${error}`);
    }
}

module.exports = {createUserCollection, migrateData};