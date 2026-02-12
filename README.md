# Crème & Cookies - Tiramisu Website

Site web de commande de tiramisus personnalisables créé avec React, Vite et Tailwind CSS.

## 🍰 Fonctionnalités

- **Configuration personnalisée** : Créez votre tiramisu avec vos ingrédients préférés
- **Tiramisus préfaits** : Choisissez parmi nos 10 créations exclusives
- **Option Kinder Bueno White** : Version blanche disponible
- **Tarifs fixes** : 5€ (format L) / 10€ (format XL)
- **Système de commande** : Panier, checkout et suivi des commandes
- **Tableaux de bord** : Admin, Cuisine, Livraison
- **Design responsive** : Compatible mobile et desktop
- **Authentification** : Système de connexion par rôles

## 🛠️ Technologies

- **React 19.2.3** avec TypeScript
- **Vite 7.2.4** pour le développement rapide
- **Tailwind CSS 4.1.17** pour le styling
- **Zustand** pour la gestion d'état
- **Lucide React** pour les icônes

## 🚀 Démarrage

```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm run dev

# Build pour la production
npm run build

# Preview du build de production
npm run preview
```

## 📁 Structure du projet

```
src/
├── assets/          # Images et logos
├── components/      # Composants réutilisables
├── pages/          # Pages de l'application
├── utils/          # Fonctions utilitaires
├── store.ts        # État global (Zustand)
├── App.tsx         # Composant principal
└── main.tsx        # Point d'entrée
```

## 🎨 Thème

Palette de couleurs pastel :
- Rose pastel : `#F2C4CE`
- Bleu pastel : `#B8D4E3`
- Beige pastel : `#F5E6D3`

## 📱 Déploiement

Ce site est optimisé pour le déploiement sur Vercel avec configuration automatique depuis le repository GitHub.

## 📝 Licence

Projet créé pour Crème & Cookies © 2024
