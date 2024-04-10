import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Book from './components/book/Book';
import BookDetail from './components/book/BookDetail';
import  Login from './components/Login';
import '../src/style/App.css';
import ggIcon  from './assets/logo.svg';
import searchIcon from './assets/loop.svg';
import upIcon from './assets/best-seller.svg';
import LoginComponent from './components/LoginComponent';
import CategoryMenu from './components/CategoryMenu';
import { AuthProvider } from './context/AuthContext';
import PasswordResetPage from './components/auth/PasswordResetPage';
import CartSidebar from './components/cart/CartSideBar';
import { Provider } from 'react-redux';
import store from './store';

function App() {
    return (
        <Provider store={store}>
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
                        <div className="main-content">
                            <Routes>
                                <Route path="/" element={<Book />} />
                                <Route path="/book/:id" element={<BookDetail />} />
                                <Route path="/admin" element={<Login />} />
                                <Route path="/reset_password/:token" element={<PasswordResetPage />} />
                            </Routes>
                        </div>
                        <CartSidebar />
                    </div>
                </Router>
            </AuthProvider>
        </Provider>
    );
}

export default App;
