#!/bin/sh

# Définir une valeur par défaut pour REACT_APP_API_URL
API_URL=${REACT_APP_API_URL:-http://localhost:5000/api}
echo "Configuring frontend with API_URL: $API_URL"

# Remplacer le placeholder dans env.js
sed -i "s|%%REACT_APP_API_URL%%|$API_URL|g" /usr/share/nginx/html/env.js

# Démarrer nginx
echo "Starting nginx..."
exec nginx -g 'daemon off;'