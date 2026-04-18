---
title: "Home Inventory App"
slug: "home-inventory"
date: "2025-07-11"
description: "Application web full-stack pour organiser et gérer ses objets personnels dans des maisons partagées, avec rôles utilisateurs, design accessible, déploiement automatisé et sécurité renforcée."
stack:
  - Figma
  - Next.js
  - shadcn/ui
  - Tailwind CSS
  - Axios
  - Prisma ORM
  - PostgreSQL
  - Express.js
  - Cypress
  - Jest
  - Coolify
---

# Home Inventory App

- Projet d'école
- 09/2024 -> 07/2025 (1 jour par semaine)
- [Code source frontend](https://github.com/lemathurin/inventory-frontend)
- [Code source backend](https://github.com/lemathurin/inventory-backend)

<aside>
<h2>TL;DR</h2>

Dans le cadre de mon projet de certification RNCP, j’ai conçu et
développé une application web full‑stack. Elle permet aux utilisateurs de
recenser, organiser et gérer leurs objets personnels au sein de maisons
partagées, avec un système de permissions (RBAC). L’app repose sur un backend
Express + PostgreSQL et un frontend Next.js avec une architecture modulaire en
couches.

Le design a été pensé pour l’accessibilité, la collaboration
multi-utilisateur et une bonne UX. Le projet est auto-hébergé sur un VPS
Hetzner via Coolify, avec déploiement automatisé, tests
Jest et Cypress, et un fort accent mis sur la sécurité.

</aside>

## Présentation du projet

Ce projet a été réalisé dans le cadre de la validation du titre RNCP _Concepteur Développeur d'Application_, en collaboration avec [Pierre Pedrono](https://github.com/PierrePedrono).

Il s’agit de la création d’une application web nommée Home Inventory App, destinée à aider les utilisateurs à recenser, organiser et classer leurs biens personnels de manière structurée. L’application vise également à simplifier le partage et la gestion collaborative au sein d’un foyer ou entre plusieurs utilisateurs.

L’objectif principal était de concevoir une application intuitive, fonctionnelle et adaptée aux besoins réels des utilisateurs pour la gestion de leurs effets personnels.

## Tech stack et outils

- Figma
- Next.js
- shadcn/ui
- Tailwind CSS
- Axios
- Prisma ORM
- PostgreSQL
- Express.js
- Cypress
- Jest
- Coolify

## Conception

On a d'abord évalué les caractéristiques clés qui étaient nécessaires avec des personas, puis on est passés à l'architecture de la base de données et aux wireframes.

<figure>
  <img
    src="https://5q44w9bzpv.ufs.sh/f/vqzvWuhpJmwXE387FvsG6gOnMlAdUt9PS0o4YsupbXwEmJa5"
    alt="Diagramme entité-relation montrant des utilisateurs liés à des maisons, des pièces et des objets avec des tables de permissions."
  />
  <figcaption>Schéma MLD.</figcaption>
</figure>

La conception de la base de données a suivi une approche progressive, en partant d’un Modèle Conceptuel de Données (MCD) pour identifier les entités clés et leurs relations (utilisateurs, maisons, pièces, objets, médias), avant de le traduire en Modèle Logique de Données (MLD).

Les relations many-to-many ont été normalisées via des tables de liaison (`UserHome`, `UserRoom`, etc.), permettant une gestion fine des permissions tout en assurant la cohérence des données. Cette structure facilite la collaboration multi-utilisateurs et permet le déplacement flexible des objets dans les logements.

<figure>
  <img
    src="https://5q44w9bzpv.ufs.sh/f/vqzvWuhpJmwXPwfISslwEzpJ68oQB5uCRd9GjhgDNyL0AeaO"
    alt="Wireframes du projet créés dans Figma, montrant certaines des pages, telles que la page de l'objet, la page d'ajout d'objet, la page des paramètres de la maison, et leurs modales respectives."
  />
  <figcaption>Quelques wireframes du projet dans Figma.</figcaption>
</figure>

Réalisés dans Figma, les wireframes définissent la structure des interfaces et les parcours utilisateurs. Ils posent les bases de la navigation, des pages de gestion (tableau de bord, paramètres, formulaires), et permettent de valider l’ergonomie avant le travail de design visuel.

<figure>
  <img
    src="https://5q44w9bzpv.ufs.sh/f/vqzvWuhpJmwXhNS9BIRZgUTZi1IXl89BAyExJo46K3DYk0pV"
    alt="Maquette du tableau de bord montrant les derniers objets ajoutés, les pièces récemment modifiées, et les objets avec des garanties expirantes."
  />
  <figcaption>Une maquette réalisée dans Figma.</figcaption>
</figure>

Les maquettes haute-fidélité traduisent les wireframes en interfaces graphiques complètes, intégrant la charte graphique (police Geist, couleurs accessibles, composants shadcn/ui). Disponibles en version desktop et mobile, elles ont servi de base directe pour le développement.

Une attention particulière a été portée à l’accessibilité dès cette étape, avec un contraste suffisant, une hiérarchie claire et l’utilisation de composants conformes aux standards d’accessibilité (ARIA, structure HTML sémantique, etc.).

## Architecture en couches

<figure>
  <img
    src="https://5q44w9bzpv.ufs.sh/f/vqzvWuhpJmwXZLjEBNCSLlRducqbNZgY7F3QVhKp02nC4JrI"
    alt="Un schéma de l'architecture globale du projet, montrant comment le frontend et le backend communiquent et quelles technologies sont utilisées."
  />
  <figcaption>Schéma de l'architecture globale du projet.</figcaption>
</figure>

L'application repose sur une architecture modulaire en couches, avec une séparation claire entre le frontend et le backend. Le projet est divisé en deux repos Git. Cette séparation permet de déployer et de tester chaque partie de façon indépendante. Elle facilite également le remplacement de l’un ou l’autre dans le futur.

### Structure du backend

Le backend est structuré en couches distinctes :

- **Routes** : définissent les points d'entrée HTTP (ex. `/api/items/:itemId`).
- **Middlewares** : gèrent l’authentification, les permissions (RBAC), la validation ou la sanitization des données.
- **Contrôleurs** : contiennent la logique métier.
- **Modèles (via Prisma)** : centralisent l’accès à la base de données.
- **Utils** : fonctions utilitaires réutilisées.

<figure>
  <img
    src="https://5q44w9bzpv.ufs.sh/f/vqzvWuhpJmwXS2yPpA8Wfbl01CeIMUcRpEmhQG4jYasznHtF"
    alt="Une capture d'écran des routes 'item', montrant les middlewares."
  />
  <figcaption>Les routes avec middleware.</figcaption>
</figure>

### Structure du frontend

Le frontend adopte une approche hybride, combinant deux niveaux complémentaires. D'abord, le système de routage Next.js app router, qui structure l'organisation des pages selon les dossiers de l'application. Et ensuite, une organisation modulaire inspirée Domain-Driven Design (DDD) pour tout le reste.

Chaque domaine contient une structure interne standardisée :

- `hooks` : Hooks personnalisés du domaine.
- `types` : Interfaces TypeScript du domaine.
- `endpoints` : Fichier qui regroupe chaque endpoint API et les exporte pour être utilisés dans les hooks.
- `context` : Fournit un contexte React spécifique au domaine, permettant de partager efficacement des états ou des fonctions entre plusieurs composants sans avoir à propager les props manuellement

<figure>
  <img
    src="https://5q44w9bzpv.ufs.sh/f/vqzvWuhpJmwXWOZl3YecTO3iMto6emnEgLb4HW1Ns8plvYJ0"
    alt="Une capture d'écran de la structure du domaine 'home', montrant les hooks, types, endpoints, et context."
  />
  <figcaption>Structure d'un domaine.</figcaption>
</figure>

## Implémentation

> Nous avons décidé de ne pas inclure le téléchargement d'images/fichiers car nous n'avions pas assez de temps pour le faire proprement (1 jour par semaine).

<figure>
  <img
    src="https://5q44w9bzpv.ufs.sh/f/vqzvWuhpJmwX8CYx1J9JDTfWgAlhuPovV1HpMsKxLraBSFC5"
    alt="Capture d'écran du tableau de bord, montrant 9 des objets les plus récemment ajoutés."
  />
  <figcaption>Le tableau de bord d'une maison.</figcaption>
</figure>

<figure>
  <img
    src="https://5q44w9bzpv.ufs.sh/f/vqzvWuhpJmwXNA541FPV9aX7GKwfgvtTzMLsJeBUjynFP40u"
    alt="Capture d'écran de la page de création d'objet, avec les champs : nom de l'objet, description, prix, date d'achat. Suivi d'un sélecteur de pièce et de visibilité, ainsi qu'un interrupteur pour ajouter une garantie."
  />
  <figcaption>La page de création d'objet.</figcaption>
</figure>

<figure>
  <img
    src="https://5q44w9bzpv.ufs.sh/f/vqzvWuhpJmwXPRfJcDlwEzpJ68oQB5uCRd9GjhgDNyL0AeaO"
    alt="Capture d'écran de la page des paramètres de la maison, montrant un panneau pour gérer les pièces, et un autre panneau pour gérer les utilisateurs."
  />
  <figcaption>La page des paramètres de la maison.</figcaption>
</figure>

Les administrateurs d'une maison peuvent créer des codes d'invitation pour permettre aux utilisateurs de la rejoindre.

<figure>
  <img
    src="https://5q44w9bzpv.ufs.sh/f/vqzvWuhpJmwXhN8fKEKZgUTZi1IXl89BAyExJo46K3DYk0pV"
    alt="Capture d'écran de la page des paramètres du compte, montrant des champs pour mettre à jour le nom du compte, l'e-mail et le mot de passe."
  />
  <figcaption>La page des paramètres du compte.</figcaption>
</figure>

Les utilisateurs peuvent bien sûr supprimer leur compte, ainsi que tout ce qui est lié à leur compte.

<figure>
  <img
    src="https://5q44w9bzpv.ufs.sh/f/vqzvWuhpJmwXdiNEhJzA4DlvUCmBMNKuXES8br2QGyHYWjhk"
    alt="Capture d'écran du tableau de bord avec le mode sombre activé."
  />
  <figcaption>
    Le mode sombre a également été implémenté, car c'est toujours chouette de
    pouvoir choisir.
  </figcaption>
</figure>

## Sécurité

La sécurité des données utilisateurs a été intégrée dès les premières phases de développement. L’authentification repose sur un système de jetons JWT, stockés dans des cookies HTTP-only et sécurisés, pour limiter les risques liés aux attaques de type XSS ou CSRF. Côté backend, chaque route sensible est protégée par des middlewares vérifiant à la fois l’identité de l’utilisateur et ses permissions d’accès. Les données saisies sont nettoyées automatiquement avant enregistrement en base via un middleware de sanitization.

Enfin, toutes les actions sensibles sont conditionnées par une double vérification : d’abord côté interface, puis côté serveur, garantissant une sécurité "en profondeur" face aux manipulations d’URL ou d’API externes.

## Tests

L’application intègre des tests unitaires sur le backend et des tests end-to-end (E2E) sur le frontend. Les tests unitaires, écrits avec Jest, valident notamment les fonctions critiques de l’API, comme la récupération ou la mise à jour d’un objet avec contrôle des permissions. Du côté frontend, des scénarios E2E automatisés avec Cypress couvrent les parcours utilisateurs complets, comme la création d’un compte, l’accès à une maison partagée ou les restrictions d’édition d’un objet appartenant à un autre utilisateur.

## Déploiement

L’application est entièrement auto-hébergée sur un serveur VPS fourni par Hetzner. Le déploiement s’appuie sur la plateforme Coolify, qui permet de gérer l’orchestration des conteneurs de manière simple et efficace. Le frontend, le backend et la base de données PostgreSQL tournent chacun dans un conteneur séparé, ce qui garantit une meilleure isolation des services et facilite la maintenance.

Un pipeline CI/CD a été mis en place via GitHub Actions. À chaque push sur les branches principales (`dev` ou `main`), les tests sont exécutés, le code est formaté automatiquement, puis une build est générée. Si tout passe, un webhook déclenche le redéploiement de l'application sur Coolify.

## Améliorations

- Développement de la gestion des médias
  - Système d'upload sécurisé
- Gestion des garanties
  - Cron job côté backend pour détecter les objets dont la garantie approche de la date d'expiration
- Extension de la couverture de tests
- Migration technologique
  - Next.js -> framework React plus adapté (pas besoin de SSR ou SEO)
  - Système d'auth custom -> Better-Auth
  - Prisma ORM -> Drizzle ORM ? (ORM plus performant)
  - Ajout de React Query pour gérer le cache
