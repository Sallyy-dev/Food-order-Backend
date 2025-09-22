
import React, { useState } from "react";
import "../../UI/customerReviews.css";
import Container from "@mui/material/Container";

const reviews = [
  {
    id: 1,
    name: "Jessy Kan",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    text:
      "The Pizaa Margerita is perfection and crunchy to chew. It tastes good when served fresh.",
    rating: 4,
  },
  {
    id: 2,
    name: "Kerce Jack",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text:
      "The Spaghetti is perfection and tasty, served hot with amazing flavor.",
    rating: 2,
  },
  {
    id: 3,
    name: "Sally Gamal",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    text:
      "The Burger is crunchy and juicy. Definitely one of the best I’ve had!",
    rating: 3.5,
  },
  {
    id: 4,
    name: "Ahmed Gamal",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    text:
      "The Salad is fresh, colorful, and really delicious with a crunchy texture.",
    rating: 2.5,
  },
];

function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
//   const reviewsToShow = window.innerWidth < 767 ? 1 : 2;
const reviewsToShow = window.innerWidth <= 768 ? 1 : 2;


  const prevReview = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? reviews.length - reviewsToShow : prev - 1
    );
  };

  const nextReview = () => {
    setCurrentIndex((prev) =>
      prev + reviewsToShow >= reviews.length ? 0 : prev + 1
    );
  };

  return (
    <section className="customer-reviews">
      <Container maxWidth="lg">
        <h2>Customer Reviews</h2>
        <div className="review-wrapper">
          <button
            className="nav-arrow left"
            onClick={prevReview}
            aria-label="Previous review"
          >
            &#8249;
          </button>
          <div className="reviews-container">
            {reviews
              .slice(currentIndex, currentIndex + reviewsToShow)
              .map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <img
                      className="avatar"
                      src={review.image}
                      alt={review.name}
                    />
                    <span className="name">{review.name}</span>
                  </div>
                  <p className="review-text">{review.text}</p>
                  <div className="rating">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <span
                          key={i}
                          className={i < review.rating ? "filled-star" : "empty-star"}
                        >
                          &#9733;
                        </span>
                      ))}
                  </div>
                </div>
              ))}
          </div>
          <button
            className="nav-arrow right"
            onClick={nextReview}
            aria-label="Next review"
          >
            &#8250;
          </button>
        </div>
      </Container>
    </section>
  );
}

export default CustomerReviews;
