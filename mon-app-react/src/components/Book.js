// Book.js
import React, { useEffect, useState } from 'react';
import useBooks from '../hook/useBooks';
import Rating from './Rating';
import '../style/Book.css'; // Assurez-vous que le chemin est correct

function Book() {
    const [query, setQuery] = useState("");
    const { books, loading, error } = useBooks();
    const [filteredBooks, setFilteredBooks] = useState([]);

    useEffect(() => {
        if (!loading && books) {
            const filtered = query === '' ? books : books.filter(book =>
                book.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredBooks(filtered);
        }
    }, [query, books, loading]);

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    };

    // Générez un numéro aléatoire pour l'image
    const getRandomImage = () => {
        const number = Math.floor(Math.random() * 4) + 1; // Génère un nombre entre 1 et 4
        return `/images/book${number}.webp`;
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur: {error}</div>;

    return (
        <div className="book-list">
            <input
                type="text"
                placeholder="Rechercher des livres..."
                value={query}
                onChange={handleSearchChange}
                className="search-input"
            />
            <div className="books-grid">
                {filteredBooks.map(book => (
                    <div key={book.id} className="book-item">
                        <img src={getRandomImage()} alt={book.title} className="book-image" />
                        <div className="book-details">
                            <h3 className="book-title">{book.title}</h3>
                            <p className="book-author">{book.Author.name}</p>
                            <Rating bookId={book.id} onRating={(rating) => console.log(rating)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Book;
