Création du projet avec:    -> node.js pour le backend
                            -> vue.js pour le frontend
                            -> mysql pour la base de données




1 .Clonez le projet
    Disponible à l'adresse suivante: https://github.com/RenaudLaz/RenaudLazardeux_7_30032021

2. Modifiez le fichier exemple.config.js (pour se conneter à la base de données), puis le renommer en db.config.js
    Disponible dans: backend/config/exemple.db.config.js

3. Récupérez les dépendances du package.json.
    Pour le Backend faire:  -cd backend
                            -npm install

    Pour le Frontend faire: -cd frontend
                            -npm install

4. Lancez le backend et le frontend.
    Pour le Backend faire:  -cd backend
                            -nodemon server.js

    Pour le Frontend faire: -cd frontend
                            -npm run serve

5. Créez la base de données.
    Récupérez le fichier database.sql disponible dans le projet (possibilitée de modifier ou ajouter des champs)