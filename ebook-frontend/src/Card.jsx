import publishedBook from "./assets/publihsedbook.jpeg";
import propTypes from "prop-types";
function Card(props){
    return(
        <div className="card">
            <img className='card-image' src={props.src} alt="book-image"></img>
            <h2 className='card-title'>{props.name}</h2>
            <p className='card-text'>{props.desc}</p>
            <p className='card-text'>Is it best seller : {props.isBestSeller ? "Yes" : "No"}</p>

            <button className="card-details">
                View Details
            </button>

        </div>
    );
}
Card.propTypes={
    src : propTypes.string,
    name : propTypes.string,
    desc : propTypes.string, 
}
Card.defaultProps={
    src : publishedBook,
    name: "Published Book",
    desc : "Book with no description",
    isBestSeller : false,
}
export default Card;