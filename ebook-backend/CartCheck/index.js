const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        const { name } = JSON.parse(event.body);

        // Define the query parameters to search for the book by name
        const params = {
            TableName: "Cart",
            KeyConditionExpression: "#name = :name", // Use a placeholder for the reserved keyword
            ExpressionAttributeNames: {
                "#name": "name" // Map the placeholder to the actual attribute name
            },
            ExpressionAttributeValues: {
                ":name": name,
            },
            IndexName: "name-index", // Ensure you have a GSI on the 'name' attribute
        };

        const result = await dynamoDb.query(params).promise();

        // Check if the book exists
        const exists = result.Items && result.Items.length > 0;

        return {
            statusCode: 200,
            body: JSON.stringify({ exists }),
        };
    } catch (error) {
        console.error("Error checking book in cart:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Failed to check book in cart",
                error: error.message,
            }),
        };
    }
};
