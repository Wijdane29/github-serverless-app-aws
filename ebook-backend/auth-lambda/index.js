const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid'); // Use UUID for unique IDs
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        // Parse the request body
        const { userName, Email, Password } = JSON.parse(event.body);

        // Validate required fields
        if (!userName || !Email || !Password) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "All fields (userName, Email, Password) are required.",
                }),
            };
        }

        // Check if email already exists using a query on the GSI
        const queryParams = {
            TableName: "User",
            IndexName: "Email-index", // The GSI name
            KeyConditionExpression: "Email = :email",
            ExpressionAttributeValues: {
                ":email": Email,
            },
        };

        const result = await dynamoDb.query(queryParams).promise();

        // If email already exists, return an error
        if (result.Items.length > 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "An account with this email already exists.",
                }),
            };
        }

        // Generate a unique UserID
        const UserID = uuidv4();

        // Prepare parameters for DynamoDB
        const params = {
            TableName: "User",
            Item: {
                UserID: UserID, // Auto-generated unique ID
                userName: userName,
                Email: Email,
                Password: Password,
                CreatedAt: new Date().toISOString(),
            },
        };

        // Insert the item into DynamoDB
        await dynamoDb.put(params).promise();

        // Return success response
        return {
            statusCode: 201,
            headers: {
                "Access-Control-Allow-Origin": "http://ebook-serverless-application.s3-website.eu-north-1.amazonaws.com", // Update this to match your frontend domain
                "Access-Control-Allow-Methods": "POST",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            body: JSON.stringify({
                message: "User signed up successfully.",
                UserID: UserID, // Return the generated UserID for client reference
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
