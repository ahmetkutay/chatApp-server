const Logger = require('../../helpers/logger');

const userSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["username", "firstName", "lastName", "email", "password", "mobileNumber"],
        additionalProperties: true,
        properties: {
            username: {
                bsonType: "string",
                maxLength: 75,
                description: "'username' is required and is a string"
            },
            firstName: {
                bsonType: "string",
                minLength: 2,
                maxLength: 75,
                description: "'firstName' is required and is a string"
            },
            lastName: {
                bsonType: "string",
                minLength: 2,
                maxLength: 75,
                description: "'lastName' is required and is a string"
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
                description: "'mobileNumber' is an optional field and is a string"
            },
            verified: {
                bsonType: "bool",
                description: "'verified' is an optional field and is a boolean"
            },
            verificationToken: {
                bsonType: "string",
                maxLength: 6,
                description: "'verificationToken' is required and is a string"
            },
            activeStatus: {
                bsonType: "bool",
                description: "Status with a default value of 'active' or 'inactive'."
            },
            oauthProfiles: {
                bsonType: "array",
                maxItems: 5,
                description: "'oauthProfiles' is an optional field and is an array"
            },
            acceptTerms: {
                bsonType: "bool",
                description: "'acceptTerms' is an optional field and is a boolean"
            },
            createdAt: {
                bsonType: "date",
                description: "Creation date with a default value of the current date."
            },
            lastUpdatedAt: {
                bsonType: "date",
                description: "Creation date with a default value of the last updated date."
            },
            lastLoginAt: {
                bsonType: "date",
                description: "Creation date with a default value of the last login date."
            },
            resetPasswordToken : {
                bsonType: "string",
                description: "'resetPasswordToken' is an optional field and is a string"
            },

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
                document[documentType] = document[documentType] || '';
                document['verified'] = document['verified'] || false;
                document['activeStatus'] = document['activeStatus'] || false;
                document['oauthProfiles'] = document['oauthProfiles'] || [];
                document['acceptTerms'] = document['acceptTerms'] || false;
                document['createdAt'] = document['createdAt'] || new Date();
                document['lastUpdatedAt'] = document['lastUpdatedAt'] || new Date();

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