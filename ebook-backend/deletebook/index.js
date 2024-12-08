const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const { CartID } = event.pathParameters;

  const params = {
    TableName: 'Cart',  // Replace with your Cart table name
    Key: {
      CartID: CartID  // The CartID to delete
    }
  };

  try {
    // Delete the item from the table
    await dynamoDB.delete(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Book removed from cart successfully' }),
    };
  } catch (error) {
    console.error("Error deleting item from cart:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to remove book from cart' }),
    };
  }
};
