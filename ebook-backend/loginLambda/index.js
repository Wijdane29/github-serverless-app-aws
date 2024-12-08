const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        const { userName, password } = JSON.parse(event.body);

        // Validate required fields
        if (!userName || !password) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "Both 'userName' and 'password' are required.",
                }),
            };
        }

        // Query parameters for userName
        const userNameParams = {
            TableName: "User",
            IndexName: "userName-index", // GSI for userName
            KeyConditionExpression: "userName = :userName",
            ExpressionAttributeValues: {
                ":userName": userName,
            },
        };

        // Query parameters for Password
        const passwordParams = {
            TableName: "User",
            IndexName: "Password-index", // GSI for Password
            KeyConditionExpression: "Password = :password",
            ExpressionAttributeValues: {
                ":password": password,
            },
        };

        // Query the table for userName
        const userNameResult = await dynamoDb.query(userNameParams).promise();

        // Query the table for Password
        const passwordResult = await dynamoDb.query(passwordParams).promise();

        // If no results for either, the user doesn't exist or credentials are incorrect
        if (userNameResult.Items.length === 0 || passwordResult.Items.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: "User does not exist or credentials are incorrect.",
                }),
            };
        }

        // Check if the password matches the userName
        if (userNameResult.Items[0].Password !== passwordResult.Items[0].Password) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: "User does not exist or credentials are incorrect.",
                }),
            };
        }

        // User found and password matches, return all user data
        const user = userNameResult.Items[0]; // All the user data is contained here
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "User logged in successfully.",
                user: user, // Return the full user data
            }),
        };
    } catch (error) {
        console.error("Error: ", error);

        // Return error response
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "An error occurred.",
                error: error.message,
            }),
        };
    }
};
