# Project_MongoDB
 FISE3_NoSQL  
 JACQUET Clément  
 RABAN Quentin  

# Structure du code : 
Les différents scripts de manipulation de la base sont situés dans les fichiers :
- **definition.js** : fichier à executer *uniquement* pour initialiser la base de données.
- **query.js** : requête pour trouver les joueurs ayant au pluys un certain âge et jouant à un poste précis.
- **insert.js** : insertion de joueurs, équipes et matches dans la base de données.
- **atleast.js** : création d'une collection avec tous les joueurs ayant joué au moins X matches, associés à leur note moyenne.
- **connection.js** : fonction pour se connecter à la base.
- **execute.js** : fichier à executer pour manipuler la base. Il faut décommenter les fonctions à utiliser et changer les arguments, puis executer ce fichier.

# Executer le code :
- Pour initialiser la base, il faut executer d'abord le fichier *definition.js*.
- Pour manipuler la base, il faut executer le fichier *execute.js* et décommenter les fonctions que vous voulez utiliser.



# Executer du JS pour manipuler MongoDB
## Prérequis
- Installer Node.js (normalement déjà fait, sinon https://nodejs.org/en/download/package-manager)
- Ajouter le module MongoDB : npm install mongodb
- Les fichiers typescript peuvent ne pas être reliés au module, donc executer la commande : npm install --save-dev @types/node
## Manipulation
- Créer un fichier js sous le projet MongoDB.
- Ecrire son code JS dans ce fichier. (exemple ici : https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connect/#std-label-node-connect-to-mongodb)
- Executer ce fichier : node .\nom_du_fichier.js
- La base est attaquée par node et retourne si l'opération est réussie.
