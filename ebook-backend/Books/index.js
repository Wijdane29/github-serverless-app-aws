const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        // Define parameters for scanning the entire Book table
        const params = {
            TableName: "Book", // Replace with your table name
        };

        // Perform the scan operation
        const data = await dynamoDb.scan(params).promise();

        // Return the list of books
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
