// Book.js
import React, { useEffect, useState } from 'react';
import useBooks from '../../hook/useBooks';
import Rating from './../Rating';
import '../../style/Book.css'; // Assurez-vous que le chemin est correct
import { getCategories } from '../../apiService';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../store/actions/cartActions';


function Book() {
    const [query, setQuery] = useState("");
    const { books, loading, error } = useBooks();
    const [filteredBooks, setFilteredBooks] = useState([]);

    const dispatch = useDispatch();

    const handleAddToCart = (book) => {
        dispatch(addToCart(book,1));
    };

    const [currentPrice, setCurrentPrice] = useState(20);
    const maxPrice = 100;
    const [selectedCategory, setSelectedCategory] = useState(""); // Add this line
    const [categories, setCategories] = useState([]);
    // Mise à jour de useEffect pour inclure la logique de filtrage par prix
    useEffect(() => {
        if (!loading && books) {
            const filtered = books.filter(book => {
                const isMatchTitle = book.title.toLowerCase().includes(query.toLowerCase());
                const isMatchPrice =   book.price >= currentPrice && book.price <= maxPrice;
                const isMatchCategory = selectedCategory ? book.Category === `/api/categories/${selectedCategory}` : true;
                return isMatchTitle && isMatchPrice && isMatchCategory;
            });
            setFilteredBooks(filtered);
        }
    }, [query, books, loading, currentPrice, maxPrice, selectedCategory]);

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    };

    const handlePriceFilterChange = (e) => {
        setCurrentPrice(Number(e.target.value));
    };

    const getRandomImage = () => {
        const number = Math.floor(Math.random() * 4) + 1;
        return `/images/book${number}.webp`;
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };


    const resetFilters = () => {
        setQuery("");
        setSelectedCategory("");
        setCurrentPrice(20); // ou toute autre valeur initiale que vous souhaitez pour le prix
        // Pas besoin de réinitialiser les livres ou les catégories puisqu'ils ne changent pas
    };



    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoryData = await getCategories();
                setCategories(categoryData);
            } catch (error) {

            }
        };

        fetchCategories();
    }, []);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur: {error}</div>;

    return (
        <div className="container">
            <aside className="sidebar">
                <input
                    type="text"
                    placeholder="Rechercher des livres..."
                    value={query}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                {/* Ajout des entrées pour la plage de prix */}
                <div className="price-slider-container">
                    <input
                        type="range"
                        min="20"
                        max={maxPrice}
                        value={currentPrice}
                        onChange={handlePriceFilterChange}
                        className="price-slider"
                    />
                    <div className="price-slider-value">{currentPrice} €</div>
                </div>
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="category-select"
                >
                    <option value="">Toutes les catégories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <button onClick={resetFilters} className="reset-button">Clear</button>
            </aside>
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
                            <Link to={`/book/${book.id}`}>
                                <img src={getRandomImage()} alt={book.title} className="book-image" />
                                <div className="book-details">
                                    <h3 className="book-title">{book.title}</h3>
                                    <Rating bookId={book.id} onRating={(rating) => console.log(rating)} />
                                    <div>
                                        <button onClick={() => handleAddToCart(book)}>Ajouter au panier</button>

                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Book;
