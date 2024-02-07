import React, { useState, useEffect } from 'react';
import useBooks from './hook/useBooks';

function SearchBooks() {
    const [query, setQuery] = useState("");
    const { books, loading, error } = useBooks(); // Utilise destructuring pour récupérer les livres, le chargement et l'erreur
    const [filteredBooks, setFilteredBooks] = useState([]);

    useEffect(() => {
        if (!loading && books) {
            const filtered = query === '' ? books : books.filter(book =>
                book.title.toLowerCase().includes(query.toLowerCase()) ||
                book.Author.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredBooks(filtered);
        }
    }, [query, books, loading]);

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur: {error}</div>;

    return (
        <div>
            <input
                type="text"
                placeholder="Rechercher des livres..."
                value={query}
                onChange={handleSearchChange}
            />
            <div>
                {filteredBooks.map(book => (
                    <div key={book.id}>{book.title} - {book.Author}</div>
                ))}
            </div>
        </div>
    );
}

export default SearchBooks;
