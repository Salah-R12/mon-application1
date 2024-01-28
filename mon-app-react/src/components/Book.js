import React from 'react';
import useBooks from '../hook/useBooks';

function Book() {
    const { books, loading, error } = useBooks();

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Une erreur est survenue : {error}</p>;

    return (
        <div>
            <h2>Liste des livres</h2>
            {books.length > 0 ? (
                <ul>
                    {books.map(book => (
                        <li key={book.id}>
                            <img src={book.imageUrl} alt={book.title} style={{ width: '100px', height: '150px' }} />
                            <div>{book.title}</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucun livre trouvé.</p>
            )}
        </div>
    );
}

export default Book;
