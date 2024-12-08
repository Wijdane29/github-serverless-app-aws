const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        // Get userId from path parameters
        const userId = event.pathParameters.UserID;  // Make sure the variable name is consistent (userId)

        // Parse the request body for the new user data
        const { name, email, password, aboutMe, profileImage } = JSON.parse(event.body);

        // Validate required fields
        if (!userId) {  // Use userId instead of UserID
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "'UserID' is required in the path.",
                }),
            };
        }

        // Check if any field is empty (optional: add more validation for email, password, etc.)
        if (!name || !email || !password || !aboutMe || !profileImage) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "All fields (name, email, password, aboutMe, profileImage) are required.",
                }),
            };
        }

        // Prepare the update parameters for DynamoDB
        const updateParams = {
            TableName: "User",  // Replace with your table name
            Key: {
                "UserID": userId,  // Use userId here to match the path parameter
            },
            UpdateExpression: "SET #name = :name, #email = :email, #password = :password, #aboutMe = :aboutMe, #profileImage = :profileImage",
            ExpressionAttributeNames: {
                "#name": "userName",
                "#email": "Email",
                "#password": "Password",
                "#aboutMe": "aboutMe",
                "#profileImage": "profileImage",
            },
            ExpressionAttributeValues: {
                ":name": name,
                ":email": email,
                ":password": password,
                ":aboutMe": aboutMe,
                ":profileImage": profileImage,
            },
            ReturnValues: "ALL_NEW",  // Return the updated attributes after the update
        };

        // Execute the update operation in DynamoDB
        const result = await dynamoDb.update(updateParams).promise();

        // Return success response with the updated user data
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "User updated successfully.",
                user: result.Attributes,  // The updated user data
            }),
        };

    } catch (error) {
        console.error("Error: ", error);

        // Return error response
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "An error occurred while updating the user.",
                error: error.message,
            }),
        };
    }
};
