// apiService.js
const API_URL = "http://localhost:8090/api/books";

export const getBooks = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data['hydra:member'] || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données: ", error);
    return [];
  }
};


export const getCategories = async () => {
  try {
    const response = await fetch('http://localhost:8090/api/categories');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data["hydra:member"];
    console.log(data["hydra:member"]);
  } catch (error) {
    console.error("There was a problem with the fetch operation: ", error.message);
    throw error;
  }
};