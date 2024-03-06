import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookDetails } from '../apiService';
import '../style/BookDetail.css';

function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const getBookDetails = async () => {
            const details = await fetchBookDetails(id);
            setBook(details);
        };

        getBookDetails();
    }, [id]);

    if (!book) return <div>Loading...</div>;

    return (
        <div className="book-detail-container">
            <div className="book-detail-image">
                <img src="/path-to-your-image.jpg" alt={book.title} />
            </div>
            <div className="book-detail-info">
                <h1 className="book-detail-title">{book.title}</h1>
                <p className="book-detail-price">{book.price} €</p>
                <div className="book-detail-metadata">
                    <p><strong>Auteur:</strong> {book.Author.name}</p>
                    <p><strong>Langue:</strong> {book.language}</p>
                </div>
                <p className="book-detail-description">{book.description}</p>
                <button className="book-detail-add-to-cart">AJOUTER AU PANIER</button>
            </div>
        </div>
    );
}

export default BookDetail;
