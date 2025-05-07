# Campaign Manager Backend

API REST Node.js/Express pour la gestion des campagnes publicitaires. Cette API fournit les endpoints nécessaires pour créer, lire, mettre à jour et supprimer des campagnes.

## Technologies utilisées

- Node.js
- Express.js
- MongoDB (via Mongoose)
- CORS pour les requêtes cross-origin
- dotenv pour la gestion des variables d'environnement

## Structure du projet

```
backend/
├── server.js           # Point d'entrée de l'application
├── .env                # Variables d'environnement
├── package.json        # Dépendances et scripts
└── Dockerfile          # Configuration Docker
```

## Installation et démarrage

```bash
# Installation des dépendances
npm install

# Démarrage du serveur
npm start
```

## Variables d'environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes:

- `MONGODB_URI`: URI de connexion à MongoDB
- `PORT`: Port sur lequel l'API s'exécute (défaut: 5000)

## Modèle de données

### Campagne (Campaign)

| Champ | Type | Description |
|-------|------|-------------|
| name | String | Nom de la campagne |
| startDate | Date | Date de début |
| endDate | Date | Date de fin |
| budget | Number | Budget alloué |
| status | String | Statut de la campagne (active, paused, completed, draft) |
| description | String | Description détaillée |
| target | String | Public cible |
| createdAt | Date | Date de création |
| updatedAt | Date | Date de dernière mise à jour |

## API Endpoints

### Vérification de l'état
- `GET /api/health` - Vérifier l'état de l'API

### Gestion des campagnes
- `GET /api/campaigns` - Récupérer toutes les campagnes
- `GET /api/campaigns/:id` - Récupérer une campagne par ID
- `POST /api/campaigns` - Créer une nouvelle campagne
- `PUT /api/campaigns/:id` - Mettre à jour une campagne existante
- `DELETE /api/campaigns/:id` - Supprimer une campagne

## Exemple de requête

### Création d'une campagne
```
POST /api/campaigns
Content-Type: application/json

{
  "name": "Campagne été 2023",
  "startDate": "2023-06-01T00:00:00Z",
  "endDate": "2023-08-31T23:59:59Z",
  "budget": 10000,
  "status": "draft",
  "description": "Promotion des produits d'été",
  "target": "18-35 ans"
}
```

## Conteneurisation

L'API est conteneurisée avec Docker. Pour construire l'image:

```bash
docker build -t campaign-manager-backend .
```

Pour exécuter le conteneur:

```bash
docker run -p 5000:5000 -e MONGODB_URI=<votre_uri_mongodb> campaign-manager-backend
```

## Connexion à la base de données

L'API se connecte à MongoDB via l'URI fourni dans la variable d'environnement `MONGODB_URI`. Pour le développement local, vous pouvez utiliser MongoDB Atlas ou une instance locale de MongoDB.
