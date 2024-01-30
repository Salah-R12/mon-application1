import React from 'react';
import { render, screen } from '@testing-library/react';
import Book from './Book';
import { getBooks } from '../../src/apiService'; // Importez votre fonction API

// Mock de votre API
jest.mock('../../src/apiService', () => ({
    getBooks: jest.fn(),
}));

describe('Book Component', () => {
    test('affiche un message de chargement', () => {
        getBooks.mockResolvedValueOnce([]); // Simulez une réponse vide
        render(<Book />);
        const loadingElement = screen.getByText(/Chargement.../i);
        expect(loadingElement).toBeInTheDocument();
    });

    test('affiche les livres lorsqui\'ls sont chargés', async () => {
        const fakeBooks = [{ id: 1, title: 'Test Book', imageUrl: 'url' }];
        getBooks.mockResolvedValueOnce(fakeBooks);
        render(<Book />);
        const bookElement = await screen.findByText(/Test Book/i);
        expect(bookElement).toBeInTheDocument();
    });

    test('affiche un message lorsqu\'aucun livre n\'est trouvé', async () => {
        getBooks.mockResolvedValueOnce([]); // Simulez une réponse vide
        render(<Book />);
        const noBooksElement = await screen.findByText(/Aucun livre trouvé./i);
        expect(noBooksElement).toBeInTheDocument();
    });
});
