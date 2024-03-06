import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Book from './components/Book';
import BookDetail from './components/BookDetail';
import  Login from './components/Login';
import '../src/style/App.css';
import ggIcon  from './assets/logo.svg';
import searchIcon from './assets/loop.svg';
import upIcon from './assets/best-seller.svg';
import LoginComponent from './components/LoginComponent';
import CategoryMenu from './components/CategoryMenu';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <div className="header-banners">
                        <div className="black-banner"></div>
                        <div className="green-banner">
                            <div className="green-banner-content">
                                <img src={ggIcon} alt="temu" width="54" height="54" />
                                <div className="green-banner-item">
                                    <img src={upIcon} alt="Search" className="bSeller-icon" /> {/* Icône SVG comme arrière-plan CSS */}
                                    <span className="green-banner-text">Best-Sellers</span>
                                </div>
                                <CategoryMenu categoryName="Catégories" />
                                <div className="search-container">
                                    <input type="text" placeholder="Recherche..." className="search-input" />
                                    <button className="search-button">
                                        <img src={searchIcon} alt="Search" className="search-icon" />
                                    </button>
                                </div>
                                <LoginComponent />
                            </div>
                        </div>
                    </div>
                    <Routes>
                        <Route path="/" element={<Book />} />
                        <Route path="/book/:id" element={<BookDetail />} />
                        <Route path="/admin" element={<Login />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
