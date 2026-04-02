# Brain-Byte-Folio

Welcome to **Brain-Byte-Folio**! This is a modern, responsive web application built with a robust and highly scalable frontend technology stack.

## 🚀 Overview

Brain-Byte-Folio is designed with visual excellence and performance in mind, offering a premium user experience with smooth aesthetics, interactive components, and dynamic routing. It is specifically configured for seamless static hosting deployment via Firebase.

**🌍 Live Demo:** [https://brain-byte-folio-1a219.web.app/](https://brain-byte-folio-1a219.web.app/)

## 💻 Tech Stack

This project leverages the following modern web technologies:

### Core Frameworks & Libraries

- **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces.
- **[Vite](https://vitejs.dev/)**: A blazing fast frontend tooling and build tool.
- **[TypeScript](https://www.typescriptlang.org/)**: Strongly typed programming language that builds on JavaScript for robust development.

### Styling & UI Design

- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid and highly customizable UI development.
- **[shadcn/ui](https://ui.shadcn.com/) / Radix UI**: High-quality, accessible, and unstyled React components for assembling a beautiful foundational design system.
- **[Framer Motion](https://www.framer.com/motion/)**: A production-ready motion library for React to create fluid and dynamic micro-animations.
- **[Lucide React](https://lucide.dev/)**: Beautiful and consistent iconography.

### Data & State Management

- **[React Query (@tanstack/react-query)](https://tanstack.com/query/latest/)**: Powerful asynchronous state management, data fetching, and caching.
- **[React Router Dom](https://reactrouter.com/)**: Declarative routing for sophisticated page navigation.
- **[Zod](https://zod.dev/)**: TypeScript-first schema declaration and validation library.

### Development & Testing

- **[ESLint](https://eslint.org/) & [TypeScript ESLint](https://typescript-eslint.io/)**: For maintaining high code quality.
- **[Vitest](https://vitest.dev/) & [Testing Library](https://testing-library.com/)**: Next generation blazing fast unit testing framework.
- **[Playwright](https://playwright.dev/)**: Reliable end-to-end testing for modern web apps.

### Deployment Integration

- **Firebase Hosting**: Fully configured for continuous and secure static application updates.

## 🛠️ Getting Started

To get a local copy up and running, follow these simple steps:

### Prerequisites

Make sure you have Node.js (v16+) installed.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/amano2/brain-byte-folio.git
   cd brain-byte-folio
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

   *The application will start on `http://localhost:8080/`.*

### Building for Production

To generate a production-ready bundle, run:

```bash
npm run build
```

## 📬 Deployment

This project comes pre-configured with `firebase.json` for Firebase Hosting.
Deploy your built project by running:

```bash
firebase deploy
```
