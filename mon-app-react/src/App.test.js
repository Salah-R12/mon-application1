import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from './App';
import useBooks from './hook/useBooks'; // Assurez-vous que le chemin d'importation est correct


jest.mock('./hook/useBooks', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    books: [{ id: 1, title: 'Test Book', imageUrl: 'url' }],
    loading: false,
    error: null,
  })),
}));

describe('App Component', () => {
  test('rend le composant Book avec des données', async () => {
    await act(async () => {
      render(<App />);
    });
    const bookElement = await screen.findByText('Test Book');
    expect(bookElement).toBeInTheDocument();
  });

  test('affiche le message de chargement', async () => {
    useBooks.mockReturnValue({ books: [], loading: true, error: null });
    await act(async () => {
      render(<App />);
    });
    const loadingElement = screen.getByText(/Chargement.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  test('affiche un message d\'erreur en cas d\'erreur', async () => {
    useBooks.mockReturnValue({ books: [], loading: false, error: 'Erreur' });
    await act(async () => {
      render(<App />);
    });
    const errorElement = screen.getByText(/Une erreur est survenue : Erreur/i);
    expect(errorElement).toBeInTheDocument();
  });

  test('affiche un message lorsqu\'aucun livre n\'est trouvé', async () => {
    useBooks.mockReturnValue({ books: [], loading: false, error: null });
    await act(async () => {
      render(<App />);
    });
    const noBooksElement = screen.getByText(/Aucun livre trouvé./i);
    expect(noBooksElement).toBeInTheDocument();
  });
});
