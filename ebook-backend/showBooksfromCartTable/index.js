const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const userId = event.pathParameters.userId; // Extract UserID from URL parameter

    try {
        // Define parameters for scanning the Cart table and filtering by UserID
        const params = {
            TableName: "Cart", // Replace with your table name
            FilterExpression: "UserID = :userId", // Filter by UserID
            ExpressionAttributeValues: {
                ":userId": userId,
            },
        };

        // Perform the scan operation with the filter
        const data = await dynamoDb.scan(params).promise();

        // Return the list of books for the given UserID
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Adjust this based on your frontend domain
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            body: JSON.stringify({
                message: "Books fetched successfully.",
                books: data.Items,
            }),
        };
    } catch (error) {
        console.error("Error fetching books:", error);

        // Return an error response
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "An error occurred while fetching books.",
                error: error.message,
            }),
        };
    }
};
