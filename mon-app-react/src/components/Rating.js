// Rating.js
import React, { useState } from 'react';
import '../style/Book.css';
const Rating = ({ bookId }) => {
    const [rating, setRating] = useState(0);
    const API_URL = `http://localhost:8090/api/books/${bookId}`;
    const handleRating = (ratingValue) => {
        setRating(ratingValue);
        fetch(API_URL, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/merge-patch+json',
            },
            body: JSON.stringify({ rating: ratingValue }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Note mise à jour avec succès:', data);
            })
            .catch((error) => {
                console.error('Erreur lors de la mise à jour de la note:', error);
            });
    };

    return (
        <div>
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            style={{ display: "none" }}
                            onClick={() => handleRating(ratingValue)}
                        />
                        <span
                            className="star"
                            style={{ cursor: "pointer", color: ratingValue <= rating ? "#ffc107" : "#e4e5e9" }}
                        >
              ★
            </span>
                    </label>
                );
            })}
        </div>
    );
};

export default Rating;
