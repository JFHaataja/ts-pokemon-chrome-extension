# Typescript Pokémon Chrome Extension

A simple and expandable Chrome extension that allows users to fetch Pokémon type data, calculate weaknesses, and cache information for faster performance. Built with React, TypeScript, and Vite.

![image](https://github.com/user-attachments/assets/7e27a722-46ab-4596-bf91-49288224f662)

---

## ✨ Features

- 🔎 **Search Pokémon Types**: Fetch type data from [PokeAPI](https://pokeapi.co/).
- 🛡️ **Weakness Calculation**: Display 2× and 4× weaknesses based on type interactions.
- ⚡ **Caching with Chrome Storage**: Improve speed by storing fetched data locally.
- 🚀 **Built with Vite + React**: Fast, lightweight, and easy to maintain.
- 🧪 **Fully Tested**: Using [Vitest](https://vitest.dev/) for unit testing.
- 📦 **Ready for Deployment**: Optimized for publishing as a Chrome extension.

---

## 🛠️ Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/pokemon-chrome-extension.git
cd pokemon-chrome-extension
```

2. **Install dependencies:**

```bash
npm install
```

2. **Run locally:**

```bash
npm run dev
```

---

## 🛠️ Running Tests

**Execute all unit tests:**

```bash
npm run test
```

---

## 🛠️ Building the Chrome Extension

**1. Build the production files:**

```bash
npm run build
```

**2. Load the extension into Chrome:**

- Go to chrome://extensions/

- Enable Developer Mode

- Click Load Unpacked

- Select the dist/ folder created after build

---

## 📜 Technologies Used

- React (Vite + TypeScript)

- Vitest (Testing)

- Chrome Extension APIs (chrome.storage, manifest v3)

- Axios (Fetching API data)

---

## 🎉 Gotta catch 'em all!
