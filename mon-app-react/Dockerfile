# Utiliser une image Node
FROM node:18.17.0

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier le reste du code source
COPY . .

# Exposer le port 8000 (port par défaut pour Create React App)
EXPOSE 8080

# Lancer l'application avec npm start
CMD ["npm", "start"]
