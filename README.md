# Projet BDE - *NextBDE*

## Installation locale

```bash
git clone https://github.com/Team-Infernal/NextBDE.git

cd NextBDE

npm install
#ou (pour une installation à partir du packagelock.json)
npm ci
```

## Remplir les variables d'environnement

```bash
cp .env .env.local
```

Modifier les variables pour avoir accès à vos données et aux API des fournisseurs.

- `MONGODB_URI`: le `connection string` fournit par MongoDB.
- `MONGODB_DB`: le nom de votre base de données.
- `NEXTAUTH_URL`: vous pouvez mettre `http://localhost:3000` pendant le développement.
- `NEXTAUTH_SECRET`: vous pouvez utiliser la commande `openssl rand -base64 32` et puis coller le résultat.

## Démarrer le serveur local

```bash
npm run dev
```

Vous pouvez maintenant ouvrir votre navigateur et aller sur [http://localhost:3000](http://localhost:3000).

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Déploiement

Si vous le souhaitez, vous pouvez déployer votre application à l'aide de la plateforme [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).