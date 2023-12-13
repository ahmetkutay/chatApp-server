const Logger = require('../../helpers/logger');

const resetPasswordSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["userId", "token", "createdAt"],
        properties: {
            userId: {
                bsonType: "objectId",
                description: "must be an objectId and is required"
            },
            token: {
                bsonType: "string",
                description: "must be a string and is required"
            },
            createdAt: {
                bsonType: "date",
                description: "must be a date and is required"
            }
        }
    }
};

async function createResetPasswordCollection(mongoDB) {
    try {
        await mongoDB.command({create: "resetPasswords", validator: {$jsonSchema: resetPasswordSchema.$jsonSchema}});
        Logger.info("ResetPasswords collection created with schema validation.");
    } catch (error) {
        Logger.error(`Error creating resetPasswords collection: ${error}`);
    }
}

async function migrateResetPasswordData(mongoDB) {
    try {
        const collection = mongoDB.collection('resetPasswords');

        const cursor = collection.find();
        for (const document of cursor) {
            try {
                document['userId'] = document['userId'] || '';
                document['token'] = document['token'] || '';
                document['createdAt'] = document['createdAt'] || new Date();

                await collection.save(document);
            } catch (error) {
                Logger.error(`Error migrating data for document with _id ${document._id}: ${error}`);
            }
        }

        Logger.info('ResetPassword data migration completed.');
    } catch (error) {
        Logger.error(`Error during resetPassword data migration: ${error}`);
    }
}

module.exports = [createResetPasswordCollection, migrateResetPasswordData];
