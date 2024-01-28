// apiService.js
const API_URL = "http://localhost:8090/api/books";

export const getBooks = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();  // Utilisation de `await` et déclaration de `data`
    return data['hydra:member'] || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données: ", error);
    return [];
  }
};
