---
title: "Home Inventory App"
slug: "home-inventory"
date: "2025-07-11"
description: "A full-stack web app to organize and manage personal belongings in shared homes, with user roles, accessibility-first design, automated deployment, and robust security."
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

- School project
- 09/2024 → 07/2025 (1 day per week)
- [Frontend source code](https://github.com/lemathurin/inventory-frontend)
- [Backend source code](https://github.com/lemathurin/inventory-backend)

<aside>
<h2>TL;DR</h2>

For my RNCP certification project, I designed and developed a full-stack web application. It allows users to list, organize, and manage their personal belongings within shared homes, with a role-based access control system (RBAC). The app runs on an Express + PostgreSQL backend and a modular layered Next.js frontend.

The design was created with accessibility, multi-user collaboration, and good UX in mind. The project is self-hosted on a Hetzner VPS via Coolify, with automated deployment, Jest and Cypress tests, and a strong focus on security.

</aside>

## Project Overview

This project was completed as part of the RNCP certification _Application Developer Designer_, in collaboration with [Pierre Pedrono](https://github.com/PierrePedrono).

It consists of building a web application called Home Inventory App, aimed at helping users list, organize, and categorize their personal items in a structured way. The app also aims to simplify sharing and collaborative management within a household or between multiple users.

The main goal was to create an intuitive, functional application tailored to real user needs for managing personal belongings.

## Tech Stack and Tools

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

## Design

We first defined the key features through personas, then moved on to database architecture and wireframes.

<figure>
  <img
    src="https://5q44w9bzpv.ufs.sh/f/vqzvWuhpJmwXE387FvsG6gOnMlAdUt9PS0o4YsupbXwEmJa5"
    alt="Entity-relationship diagram showing users linked to homes, rooms, and items, with permission tables."
  />
  <figcaption>Logical Data Model (LDM).</figcaption>
</figure>

The database design followed a progressive approach, starting from a Conceptual Data Model (CDM) to identify key entities and relationships (users, homes, rooms, items, media), and then translating it into a Logical Data Model (LDM).

Many-to-many relationships were normalized via junction tables (`UserHome`, `UserRoom`, etc.), enabling fine-grained permission management while ensuring data consistency. This structure facilitates multi-user collaboration and allows flexible item relocation between homes.

<figure>
  <img
    src="https://5q44w9bzpv.ufs.sh/f/vqzvWuhpJmwXPwfISslwEzpJ68oQB5uCRd9GjhgDNyL0AeaO"
    alt="Wireframes created in Figma, showing pages such as item detail, item creation, home settings, and related modals."
  />
  <figcaption>Some project wireframes in Figma.</figcaption>
</figure>

Created in Figma, the wireframes define the interface structure and user flows. They laid the groundwork for navigation, admin pages (dashboard, settings, forms), and helped validate usability before visual design.

<figure>
  <img
    src="https://5q44w9bzpv.ufs.sh/f/vqzvWuhpJmwXhNS9BIRZgUTZi1IXl89BAyExJo46K3DYk0pV"
    alt="High-fidelity mockup of the dashboard, showing recently added items, recently modified rooms, and items with expiring warranties."
  />
  <figcaption>One high-fidelity mockup in Figma.</figcaption>
</figure>

The high-fidelity mockups turned wireframes into complete interfaces, incorporating the design system (Geist font, accessible colors, shadcn/ui components). Desktop and mobile versions were created and served as the direct basis for development.

Accessibility was prioritized at this stage, with sufficient contrast, clear hierarchy, and the use of components that follow accessibility standards (ARIA, semantic HTML, etc.).

## Layered Architecture

<figure>
  <img
    src="https://5q44w9bzpv.ufs.sh/f/vqzvWuhpJmwXZLjEBNCSLlRducqbNZgY7F3QVhKp02nC4JrI"
    alt="A diagram of the overall project architecture, showing frontend/backend communication and used technologies."
  />
  <figcaption>Global architecture diagram.</figcaption>
</figure>

The application follows a modular layered architecture, with a clear separation between the frontend and backend. The project is split across two Git repositories. This makes it easier to test or replace each part independently in the future.

### Backend Structure

The backend is structured into distinct layers:

- **Routes**: define HTTP entry points (e.g., `/api/items/:itemId`)
- **Middlewares**: handle authentication, permissions (RBAC), validation, or data sanitization
- **Controllers**: contain business logic
- **Models (via Prisma)**: handle database access
- **Utils**: reusable utility functions

<figure>
  <img
    src="https://5q44w9bzpv.ufs.sh/f/vqzvWuhpJmwXS2yPpA8Wfbl01CeIMUcRpEmhQG4jYasznHtF"
    alt="Screenshot of 'item' routes with middlewares."
  />
  <figcaption>Routes with middleware.</figcaption>
</figure>

### Frontend Structure

The frontend adopts a hybrid approach, combining two methods. First, the Next.js app router system, which structures the organization of pages according to the application's folders. And secondly, a Domain-Driven Design (DDD)-inspired modular organization for everything else.

Each domain includes a standardized internal structure:

- `hooks`: Custom hooks related to the domain
- `types`: TypeScript interfaces
- `endpoints`: Contains API calls and exports them for use in hooks
- `context`: Provides a React context for shared state/functions across components

<figure>
  <img
    src="https://5q44w9bzpv.ufs.sh/f/vqzvWuhpJmwXWOZl3YecTO3iMto6emnEgLb4HW1Ns8plvYJ0"
    alt="Screenshot of the 'home' domain structure showing hooks, types, endpoints, and context."
  />
  <figcaption>Example domain structure.</figcaption>
</figure>

## Implementation

> We chose not to implement media/file upload due to time constraints (1 day per week).

<figure>
  <img
    src="https://5q44w9bzpv.ufs.sh/f/vqzvWuhpJmwX8CYx1J9JDTfWgAlhuPovV1HpMsKxLraBSFC5"
    alt="Dashboard screenshot showing 9 most recently added items."
  />
  <figcaption>A home's dashboard.</figcaption>
</figure>

<figure>
  <img
    src="https://5q44w9bzpv.ufs.sh/f/vqzvWuhpJmwXNA541FPV9aX7GKwfgvtTzMLsJeBUjynFP40u"
    alt="Screenshot of the item creation page, showing fields: name, description, price, purchase date, followed by room and visibility selectors, and a warranty toggle."
  />
  <figcaption>Item creation page.</figcaption>
</figure>

<figure>
  <img
    src="https://5q44w9bzpv.ufs.sh/f/vqzvWuhpJmwXPRfJcDlwEzpJ68oQB5uCRd9GjhgDNyL0AeaO"
    alt="Screenshot of the home settings page with panels for managing rooms and users."
  />
  <figcaption>Home settings page.</figcaption>
</figure>

Home administrators can create invite codes to let users join the home.

<figure>
  <img
    src="https://5q44w9bzpv.ufs.sh/f/vqzvWuhpJmwXhN8fKEKZgUTZi1IXl89BAyExJo46K3DYk0pV"
    alt="Screenshot of the account settings page with fields to update name, email, and password."
  />
  <figcaption>Account settings page.</figcaption>
</figure>

Users can, of course, delete their account, along with everything linked to it.

<figure>
  <img
    src="https://5q44w9bzpv.ufs.sh/f/vqzvWuhpJmwXdiNEhJzA4DlvUCmBMNKuXES8br2QGyHYWjhk"
    alt="Dashboard screenshot with dark mode enabled."
  />
  <figcaption>
    Dark mode was also implemented, as it's always nice to have the choice.
  </figcaption>
</figure>

## Security

User data security was integrated from the early stages of development. Authentication relies on a JWT-based system stored in secure, HTTP-only cookies to prevent XSS or CSRF attacks. On the backend, every sensitive route is protected by middlewares that check both the user's identity and permissions.

User input is sanitized automatically before being saved to the database via a sanitization middleware. Finally, all sensitive actions are double-checked — first in the frontend, then on the server — ensuring security against URL/API tampering.

## Testing

The app includes unit tests on the backend and end-to-end (E2E) tests on the frontend. Backend tests (written in Jest) validate critical API functions like item retrieval or updates with permission checks. On the frontend, Cypress E2E scenarios cover full user flows like account creation, joining a shared home, or editing restrictions for items owned by others.

## Deployment

The app is fully self-hosted on a VPS provided by Hetzner. Deployment is managed via Coolify, which simplifies container orchestration. The frontend, backend, and PostgreSQL database each run in separate containers. Improving service isolation and making maintenance easier.

A CI/CD pipeline is set up using GitHub Actions. On each push to `main` or `dev`, tests are run, code is auto-formatted, a build is generated, and if successful, a webhook triggers a redeploy on Coolify.

## Improvements

- Media management
  - Secure upload system
- Warranty tracking
  - Backend cron job to detect upcoming warranty expirations
- Test coverage expansion
- Tech stack migration
  - Next.js → more suitable React framework (no SSR or SEO needed)
  - Custom auth system → Better-Auth
  - Prisma ORM → Drizzle ORM? (for better performance)
  - Add React Query for caching
