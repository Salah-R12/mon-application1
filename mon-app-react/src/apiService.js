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


export const fetchBookDetails = async (id) => {
  try {
    const response = await fetch(`http://localhost:8090/api/books/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation: ", error.message);
    throw error;
  }
};

export const verifyUser = async (email, password) => {
  try {
    const response = await fetch('http://localhost:8090/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error('Utilisateur non trouvé ou mot de passe incorrect.');
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};


export const resetPassword = async (email) => {
  try {
    const response = await fetch('http://localhost:8090/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) throw new Error('Email not found');
    return await response.json();
  } catch (error) {
    console.error("Error sending reset password email:", error);
    throw error;
  }
};