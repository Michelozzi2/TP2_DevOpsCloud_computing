# Campaign Manager - Projet DevOps

## Architecture
Ce projet déploie une application web de gestion de campagnes publicitaires avec:
- Frontend: React.js
- Backend: Node.js/Express
- Base de données: MongoDB
- Infrastructure: AWS (ECS, ECR, RDS)
- CI/CD: GitHub Actions
- Monitoring: Prometheus & Grafana

## Structure du Projet
```
.
├── frontend/           # Application React
├── backend/            # API REST Express.js
├── infrastructure/     # Fichiers Terraform pour AWS
└── docker-compose.yml  # Configuration pour développement local
```

## Prérequis
- Docker et Docker Compose
- Node.js (v18+)
- AWS CLI (pour déploiement)
- Terraform (pour l'infrastructure)

## Installation locale
```bash
# Cloner le dépôt
git clone [URL_DU_REPO]
cd TP2_DevOpsCloud_computing

# Lancer l'application avec Docker Compose
docker-compose up -d
```

L'application sera accessible sur:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/api/health

## Développement

### Sans Docker
```bash
# Frontend
cd frontend
npm install
npm start

# Backend
cd backend
npm install
npm start
```

### Variables d'Environnement
- Frontend: voir `frontend/.env`
- Backend: voir `backend/.env`

## Déploiement sur AWS
```bash
# Configurer AWS CLI
aws configure

# Déployer l'infrastructure avec Terraform
cd infrastructure
terraform init
terraform apply

# Pousser les images Docker sur ECR
./deploy-images.sh
```

## Documentation
- [Documentation Frontend](./frontend/README.md)
- [Documentation Backend](./backend/README.md)