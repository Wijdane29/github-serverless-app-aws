import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./Card.css"
function Card(props){
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate("/BookDetails", { state: { ...props } });
    };

    const fullStars = Math.floor(props.rating); // Full stars
    const halfStars = (props.rating % 1) >= 0.5 ? 1 : 0; // Half star if rating has a decimal >= 0.5
    const emptyStars = 5 - fullStars - halfStars; // Remaining stars are empty

    const stars = [
        ...Array(fullStars).fill('★'), // Full stars
        ...Array(halfStars).fill('✩'), // Half star
        ...Array(emptyStars).fill('☆') // Empty stars
    ];
    return(
        <div className="card">
            <img className='card-image' src={props.src} alt="book-image"></img>
            <h2 className='card-title'>{props.name}</h2>
            <p className="card-author">By {props.author}</p>
            <p className="card-genre">{props.genre}</p>
            <p className="card-rating"> {stars.join('')}</p>
            <p className="card-price">{props.price}</p>
             <button className="card-details" onClick={handleViewDetails}>
                View Details
            </button>

        </div>
    );
}
Card.propTypes={
    src: PropTypes.string.isRequired,          // URL of the book's cover image
    name: PropTypes.string.isRequired,         // Name of the book
    author: PropTypes.string.isRequired,       // Author of the book
    genre: PropTypes.string.isRequired,        // Book genre/category
    rating: PropTypes.number.isRequired,       // Rating out of 5
    price: PropTypes.string.isRequired,        // Price as a string (e.g., "$14.99")
    isBestSeller: PropTypes.bool,              // Whether the book is a bestseller
    onViewDetails: PropTypes.func.isRequired,  // Function to handle "View Details" click 
}
export default Card;