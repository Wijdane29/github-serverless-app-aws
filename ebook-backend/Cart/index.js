const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const cartID = uuidv4();

        const cartItem = {
            CartID: cartID,
            name: body.name,
            quantity: body.quantity, // Default quantity
	    UserID: body.UserID,
            image: body.src,
            rating: body.rating,
            pdfName: body.pdf,
            author: body.author,
            genre: body.genre,
            price: body.price,
            publisher: body.publisher,
            publicationDate: body.publicationDate,
            ISBN: body.ISBN,
            pageCount: body.pageCount,
            language: body.language,
            longDescription: body.longDescription,
            addedAt: new Date().toISOString(),
        };

        const params = {
            TableName: "Cart",
            Item: cartItem,
        };

        await dynamoDb.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Book added to cart successfully",
                cartID: cartID,
            }),
        };
    } catch (error) {
        console.error("Error adding book to cart:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Failed to add book to cart",
                error: error.message,
            }),
        };
    }
};
