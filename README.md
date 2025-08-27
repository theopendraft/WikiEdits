# Wikimedia Global Edits Finder

A modern, responsive React app to explore your global Wikimedia activity, including recent edits and top edited pages, with beautiful UI and live validation.

## Features

- Search for recent edits by Wikimedia username
- View top edited pages for a user on any Wikimedia project
- Date range filtering
- Pagination for edits
- Animated, responsive UI with custom Wikimedia-inspired color palette
- Inline validation for username and project
- Friendly error and empty states

## Tech Stack

- React (Vite)
- Tailwind CSS
- framer-motion (animations)

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- Enter a Wikimedia username and (optionally) date range to see recent edits.
- Switch to "Top Edited Pages" to see which pages a user has edited most on a specific project.
- Project names should be like `en.wikipedia.org`, `commons.wikimedia.org`, etc.
- Inline errors will guide you if the username or project is invalid.

## Customization

- Colors and UI are inspired by Wikimedia: Crimson Red (#9B0000), Illuminating Emerald (#2F9A67), Sea Blue (#00669A).
- Animations use framer-motion for a smooth, modern feel.

## Folder Structure

- `src/components/` — React UI components
- `src/services/` — API and validation helpers
- `src/App.jsx` — Main app logic

## License

MIT
