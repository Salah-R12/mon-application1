import { useState, useEffect } from 'react';

function Compteur() {
  const compteur = useCompteur(0); // Démarre le compteur à 0

  return <div>Compteur: {compteur}</div>;
}

function useCompteur(initialValue) {
  const [compteur, setCompteur] = useState(initialValue);

  useEffect(() => {
    // Crée un intervalle qui s'exécute toutes les 1000 millisecondes (1 seconde)
    const interval = setInterval(() => {
      // Incrémente la valeur de 'compteur' de 1 à chaque intervalle
      setCompteur((c) => c + 1);
    }, 1000);

    // Retourne une fonction de nettoyage qui arrête l'intervalle
    // quand le composant utilisant ce Hook est démonté
    return () => clearInterval(interval);
  }, []);

  return compteur;
}

export default Compteur;

