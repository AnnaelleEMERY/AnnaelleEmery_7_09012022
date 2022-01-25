# groupomania
Cloner ce dépot Github

**Base de données**
Se connecter au serveur MySQL de votre choix. Exécutez la commande: 
create database groupomania2; 

Ajoutez le fichier .env dans le dossier backend et ajoutez-y vos variables de connexion de votre base de données :
PORT = 3000
SQL_DATABASE_NAME=groupomania2
SQL_USER=VotreIdentifiant
SQL_PASSWORD=VotreMotDePasse
JWT_KEY='RANDOM_TOKEN_SECRET'

Puis importez le fichier groupomania2.sql
mysql -u VotreIdentifiant -p groupomania2 < groupomania2.sql

Il faut remplacer groupomania2.sql par le chemin du fichier dans votre machine.

**Démarrage du backend**
1. Ouvrir un terminal
2. cd backend pour aller dans le dossier "backend"
3. npm install pour installer les dépendances
4. nodemon serve pour lancer le backend

**Demarrage Frontend Vue js**
1. Ouvrir un nouveau terminal
2. cd frontend  Aller dans le dossier "frontend"
3. npm install  pour installer les dépendances
4. npm run serve pour lancer le frontend 
