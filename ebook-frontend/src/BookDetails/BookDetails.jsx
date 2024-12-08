import React, { useState, useEffect, createContext} from "react";
import { useLocation } from "react-router-dom";
import Header from '../HomePage/Header';
import Footer from '../HomePage/Footer';
import pages from '../assets/Print length.jpg';
import lng from '../assets/language.jpg';
import publ from '../assets/publisher.jpg';
import pubDate from '../assets/publicationDate.jpg';
import ISbn from '../assets/ISBN.jpg';
import '@react-pdf-viewer/core/lib/styles/index.css'; // Core styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css'; // Default layout styles
import { Viewer } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';
import { v4 as uuidv4 } from "uuid";

import "./BookDetails.css";

function BookDetails() {
    const location = useLocation();
    const [showModal, setShowModal] = useState(false); // État pour afficher/fermer la modal
    const {
        src,
        name,
        author,
        genre,
        rating,
        price,
        publisher,
        publicationDate,
        ISBN,
        pageCount,
        language,
        longDescription,
        pdf,
    } = location.state;

    const [selectedImage, setSelectedImage] = useState(src);
    const [bookAdded, setBookAdded] = useState(false); // Tracks if the book has been added
    const [isAdding, setIsAdding] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));


   
    const addToCart = async () => {
        setIsAdding(true);
    
        const cartItem = {
            CartID: uuidv4(),
            name, // Book name for uniqueness check
            quantity: 1, // Default quantity
            UserID:user.UserID,
            ...location.state,
            addedAt: new Date().toISOString(),
        };
    
        try {
            // Check if the book already exists in the cart
            const checkResponse = await fetch("https://37jvush0v5.execute-api.eu-north-1.amazonaws.com/cart/checkBookInCart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: cartItem.name }),
            });
    
            if (!checkResponse.ok) {
                throw new Error("Failed to check cart");
            }
    
            const checkResult = await checkResponse.json();
            if (checkResult.exists) {
                alert(`The book "${cartItem.name}" is already in your cart.`);
                setIsAdding(false);
                return;
            }
    
            // Add the book to the cart
            const response = await fetch("https://37jvush0v5.execute-api.eu-north-1.amazonaws.com/cart/addBookTocart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cartItem),
            });
    
            if (!response.ok) {
                throw new Error("Failed to add to cart");
            }
    
            alert(`${cartItem.name} has been added to your cart!`);
            setBookAdded(true); 
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Failed to add the book to the cart. Please try again.");
        } finally {
            setIsAdding(false);
        }
    };
    
    

    

    return (
        <>
            <Header/>
            <div className="details-page">
            <div className="details-container">
                {/* Left Column: Image Section */}
                <div className="details-image-section">
                    {/* <div className="image-thumbnails">
                            <img src={src} alt={name} className="thumbnail-image" />
                            <img src={src} alt={name} className="thumbnail-image" />
                            <img src={src} alt={name} className="thumbnail-image" />
                    </div> */}
                    <div className="main-image-container">
                        <img src={selectedImage} alt={name} className="main-image" />
                    </div>
                </div>

                {/* Right Column: Information Section */}
                <div className="details-info">
                    {/* <p className="page-title">Home > Books > Book Detail</p> */}
                    <p className="page-title">Home &gt; Books &gt; {name}</p>
                    <h1 className="details-title">{name}</h1>
                    <p className="details-author">By {author}</p>
                    <p className="details-genre">{genre}</p>
                    <p className="details-rating">⭐⭐⭐⭐⭐ {rating}</p>
                    <p className="details-price">$ {price}</p>
                    <div className="btns-container">
                    <button
                        className="add-to-cart-button"
                        onClick={addToCart}
                        // disabled={isAdding || bookAdded} 
                    >
                        {bookAdded ? "Added to Cart" : isAdding ? "Adding..." : <><span className="cart-icon">🛒</span>Add to Cart</>}
                    </button>
                        <button className="details-pdf" onClick={() => setShowModal(true)}>Read Sample</button>
                    </div>   
                </div>
            </div>
             {/* Modal to display the PDF viewer */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-button" onClick={() => setShowModal(false)}>
                x
              </button>

              {/* PDF Viewer */}
              <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                <div className="pdf-viewer">
                  <Viewer fileUrl={pdf} />
                </div>
              </Worker>
            </div>
          </div>
        )}
            <div className="inf-container">
                <div className="thumbnail-inf">
                    <p className="thumbnail-title">Print length</p>
                    <img src={pages}></img>
                    <p>{pageCount} pages</p>
                </div>
                <div className="thumbnail-inf">
                    <p className="thumbnail-title">Language</p>
                    <img src={lng}></img>
                    <p>{language}</p>
                </div>
                <div className="thumbnail-inf">
                    <p className="thumbnail-title">Publisher</p>
                    <img src={publ}></img>
                    <p>{publisher}</p>
                </div>
                <div className="thumbnail-inf">
                    <p className="thumbnail-title">Publication date</p>
                    <img src={pubDate}></img>
                    <p>{publicationDate}</p>
                </div>
                <div className="thumbnail-inf">
                    <p className="thumbnail-title">ISBN-13</p>
                    <img src={ISbn}></img>
                    <p>{ISBN}</p>
                </div>
            </div>
            {/* Product Description Section */}
            <div className="product-description">
            <   div className="span-description"></div>
                <h2 className="section-heading">Book Description</h2>
            </div>
            <p className="para-description">{longDescription}</p>

        </div>
        <Footer />
        </>
       
    );
}

export default BookDetails;


   