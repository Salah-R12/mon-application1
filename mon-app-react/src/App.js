import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Compteur from './Compteur';
import Message from './Message';
import Login from './Login';
import Book from './components/Book';
import BookDetail from './components/BookDetail'; // Assurez-vous que ce composant existe
import SearchBooks from "./SearchBooks";
import Home from './Home'; // Assurez-vous que ce composant existe

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Book />} />
                    <Route path="/book/:id" element={<BookDetail />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
