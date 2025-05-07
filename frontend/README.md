# Campaign Manager Frontend

Application React pour la gestion des campagnes publicitaires. Cette interface permet aux utilisateurs de créer, modifier, visualiser et supprimer des campagnes.

## Technologies utilisées

- React 19.1.0
- React DOM 19.1.0
- React Scripts 5.0.1
- CSS pour le styling

## Structure du projet

```
frontend/
├── public/              # Fichiers statiques
├── src/                 # Code source
│   ├── components/      # Composants React
│   │   ├── CampaignForm.js    # Formulaire de création/édition
│   │   └── CampaignList.js    # Liste des campagnes
│   ├── services/        # Services (API, etc.)
│   │   └── api.js       # Fonctions de communication avec l'API
│   ├── App.js           # Composant principal
│   ├── App.css          # Styles CSS
│   └── index.js         # Point d'entrée
├── .env                 # Variables d'environnement
└── Dockerfile           # Configuration Docker
```

## Scripts disponibles

```bash
# Installation des dépendances
npm install

# Démarrage en mode développement
npm start

# Construction pour la production
npm run build

# Exécution des tests
npm test
```

## Variables d'environnement

- `REACT_APP_API_URL`: URL de l'API backend (par défaut: http://localhost:5000/api)

## Fonctionnalités

1. **Affichage des campagnes**: Liste de toutes les campagnes avec leurs détails
2. **Création de campagnes**: Formulaire pour créer une nouvelle campagne
3. **Modification de campagnes**: Édition des campagnes existantes
4. **Suppression de campagnes**: Possibilité de supprimer des campagnes
5. **Filtrage des campagnes**: Par statut (active, paused, completed, draft)

## Conteneurisation

L'application est conteneurisée avec Docker. Pour construire l'image:

```bash
docker build -t campaign-manager-frontend .
```

Pour exécuter le conteneur:

```bash
docker run -p 80:80 campaign-manager-frontend
```

## Intégration avec le backend

L'application communique avec le backend via des appels API REST définis dans `src/services/api.js`. Assurez-vous que l'URL de l'API est correctement configurée dans le fichier `.env`.
