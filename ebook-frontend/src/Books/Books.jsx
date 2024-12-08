import React, { useEffect, useState } from 'react';
import Header from '../HomePage/Header';
import Card from '../Card/Card';
import Footer from '../HomePage/Footer';
import './Books.css';

// Import all images and PDFs
import TheLivesofLeeMiller from '../assets/The Lives of Lee Miller.jpg';
import TheLivesofLeeMillerPdf from '../../public/The Lives of Lee Miller.pdf';

// Map of book assets
const bookAssets = {
    images: {
        'The Lives of Lee Miller.jpg': TheLivesofLeeMiller,
    },
    pdfs: {
        'The Lives of Lee Miller.pdf': TheLivesofLeeMillerPdf,
    },
};

function Books() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('https://id1ag92j8g.execute-api.eu-north-1.amazonaws.com/books/books');
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const data = await response.json();
                setBooks(data.books || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return (
            <>
                <Header />
                <div className="main-content">
                    <p>Loading books...</p>
                </div>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="main-content">
                    <p>Error loading books: {error}</p>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="main-content">
                {books.length > 0 ? (
                    books.map((book) => (
                        <Card
                            key={book.BookID}
                            src={bookAssets.images[book.image] || '../assets/default-image.jpg'} // Fallback to a default image
                            name={book.name}
                            author={book.author}
                            genre={book.genre}
                            rating={parseFloat(book.rating)}
                            price={book.price}
                            publisher={book.publisher}
                            publicationDate={book.publicationDate}
                            ISBN={book.ISBN}
                            pageCount={book.pageCount}
                            language={book.language}
                            pdf={bookAssets.pdfs[book.pdfName] || null} // Fallback to null if no PDF
                            longDescription={book.description}
                        />
                    ))
                ) : (
                    <p>No books available.</p>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Books;
