import React, { useState, useEffect } from 'react';
import './Cart.css';
import deletIcon from '../assets/delete.jpg';
import Header from '../HomePage/Header';
import Footer from '../HomePage/Footer';
import card1 from '../assets/161528368123dd7a35ad8708b0dfc74b3630526891.webp';
import card2 from '../assets/164031483205c644a5e0fa65a30b431f1488231b60.webp';
import card3 from '../assets/15282719811871317559.webp';
import card4 from '../assets/15282730981571339584.webp';
import card5 from '../assets/15282730981571339584.webp';
import card6 from '../assets/15282732983375743706.webp';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Extract UserID from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.UserID;

  // Fetch cart items when the component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!userId) {
        console.error("User not found");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`https://37jvush0v5.execute-api.eu-north-1.amazonaws.com/cart/booksFromCart/${userId}`);
        const data = await response.json();
        if (data.books) {
          setCartItems(data.books);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId]);

  const handleQuantityChange = (value, productId) => {
    const updatedCart = cartItems.map((item) =>
      item.CartID === productId ? { ...item, quantity: parseInt(value, 10) } : item
    );
    setCartItems(updatedCart);
  };

  const subTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`https://37jvush0v5.execute-api.eu-north-1.amazonaws.com/cart/cart/${productId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setCartItems(cartItems.filter((item) => item.CartID !== productId));
      } else {
        console.error('Failed to delete item from cart');
      }
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="cart-container">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Book Details</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Name</th>
              <th>Author</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.CartID} className="cart-row">
                <td className="book-details">
                  <img src={item.image} className="book-image" alt={item.name} />
                  <div className="book-info">
                    <p>{item.genre}</p>
                    <p>{item.publisher}</p>
                    <p>{new Date(item.publicationDate).toLocaleDateString()}</p>
                  </div>
                </td>
                <td>${parseFloat(item.price).toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    className="quantity-input"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => handleQuantityChange(e.target.value, item.CartID)}
                  />
                </td>
                <td className="center-text">{item.name}</td>
                <td className="center-text">{item.author}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDelete(item.CartID)}>
                    <img src={deletIcon} alt="Delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="cart-summary">
          <div className="total-section">
            <div className="total-item">
              <p className='summary'>Summary of your order</p>
              <p className='subtotal'>Subtotal: <span>${subTotal.toFixed(2)}</span></p>
              <button className="add-to-cart-button">
                Proceed To Checkout
              </button>
              <p className='subtotal'>We Accept</p>
              <div className='container-cards'>
                <img src={card1} alt="Payment Option" />
                <img src={card5} alt="Payment Option" />
                <img src={card2} alt="Payment Option" />
                <img src={card3} alt="Payment Option" />
                <img src={card4} alt="Payment Option" />
                <img src={card6} alt="Payment Option" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
