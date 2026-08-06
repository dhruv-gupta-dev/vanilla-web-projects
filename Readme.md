<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
</p>

<h1 align="center">🚀 Vanilla Projects</h1>

<p align="center">
  <strong>A growing collection of web apps built entirely with vanilla HTML, CSS, and JavaScript.</strong><br/>
  No frameworks. No libraries. No dependencies. Just the raw web platform.
</p>

<p align="center">
  <a href="#-projects">Projects</a> •
  <a href="#-what-does-this-app-do">What It Does</a> •
  <a href="#-who-is-this-for">Who It's For</a> •
  <a href="#-what-problem-does-it-solve">Problem Solved</a> •
  <a href="#%EF%B8%8F-technology-stack--why-vanilla">Tech Stack</a> •
  <a href="#-challenges--how-i-solved-them">Challenges</a>
</p>

---

## 🎯 What Does This App Do?

Vanilla Projects is a **collection of interactive web applications** built from scratch using only HTML, CSS, and JavaScript. Each project tackles a different problem domain — from game logic to data persistence — while sticking to the same philosophy: **no frameworks, no build tools, just the browser.**

### 📂 Projects

| Project | Description | Key Features |
|---------|-------------|--------------|
| [🎮 Tic-Tac-Toe](./Tic-Tac-Toe) | A two-player strategy game with accessible markup | Win/draw detection, winning-cell highlight, ARIA roles, state-driven rendering, event delegation |
| [✅ To-Do App](./To-Do-App) | A task manager with browser persistence | CRUD operations, `localStorage` persistence, checkbox toggle, immutable state updates |

---

## 👤 Who Is This For?

### 🧑‍💻 Aspiring Frontend Developers
If you're learning web development and want to see how real apps work **under the hood** — without the abstraction of React, Vue, or Angular — this repo breaks it down to fundamentals. Every feature is hand-written, every pattern is visible.

### ♿ Developers Who Care About Accessibility
The Tic-Tac-Toe project uses proper ARIA attributes (`role="grid"`, `role="gridcell"`, `aria-live="polite"`, `aria-label`) — showing how to make interactive widgets screen-reader friendly without a component library.

### 📋 Portfolio Builders
Clean, well-structured vanilla JS projects that demonstrate real engineering — state management, event handling, data persistence — without hiding behind framework magic.

---

## 🧩 What Problem Does It Solve?

### The "Framework Dependency" Trap
Modern developers often reach for React or Next.js for even the simplest projects. This creates bloated bundles, complex toolchains, and a weak grasp of how the web actually works.

**Vanilla Projects proves you don't need `node_modules` to build functional, well-architected apps.**

### The "State Management Needs a Library" Myth
Managing application state — game boards, player turns, to-do lists — is often cited as a reason to adopt frameworks. These projects demonstrate clean state management using:

- Plain arrays and objects as the source of truth
- A `render()` function that syncs DOM with state (Tic-Tac-Toe)
- `localStorage` for cross-session persistence (To-Do App)
- Immutable updates with spread syntax and `Array.filter()` / `Array.map()`

### The "Accessibility Is Hard" Excuse
The Tic-Tac-Toe game shows how a few well-placed ARIA attributes make a custom widget fully navigable by screen readers — without any accessibility library or plugin.

---

## ⚙️ Technology Stack & Why Vanilla?

### The Stack

| Technology | Role | Why It Was Chosen |
|------------|------|-------------------|
| **HTML5** | Structure & Semantics | Semantic elements (`<main>`, `<header>`, `<footer>`) give the page meaning. ARIA roles and `data-*` attributes enable accessibility and clean JS-DOM communication without hardcoded IDs. |
| **CSS3** | Styling & Layout | CSS Custom Properties (`:root` variables) create a consistent, themeable design system. CSS Grid powers the game board. Flexbox handles the To-Do layout. No preprocessor needed. |
| **JavaScript (ES6+)** | Logic & Interactivity | Modern features — nullish coalescing (`??`), optional chaining (`?.`), destructuring, spread syntax, arrow functions, `Array.filter/map/every` — produce clean, readable code with zero transpilation. |
| **localStorage API** | Persistence | Built into every browser. Zero setup. No database, no server, no API calls. Tasks survive refreshes and browser restarts. |

### Why Not Use a Framework?

| Concern | Framework Approach | Vanilla Approach (This Repo) |
|---------|-------------------|-------------------------------|
| Bundle size | 40–200KB+ gzipped | **0KB** — no dependencies |
| Build step | Webpack, Vite, Babel | **None** — open `index.html` in a browser |
| Learning curve | JSX, hooks, reactivity model | **Just the web platform** |
| Long-term maintenance | Breaking changes across versions | **Evergreen** — browsers are the runtime |
| Performance | Virtual DOM diffing overhead | **Direct DOM updates** — zero overhead |

These are intentionally small-scoped apps. A framework would be architectural overkill. The vanilla approach keeps the focus on **fundamentals**: DOM APIs, event handling, CSS layout, and browser storage.

---

## 🔥 Challenges & How I Solved Them

### 1. State-Driven Rendering Without a Virtual DOM

**The Challenge:**
In frameworks like React, you update state and the framework re-renders for you. Without a framework, how do you keep the DOM in sync with game state (board, current player, winning cells) without spaghetti code?

**The Solution:**
A single `render()` function that reads from state variables and updates every cell declaratively:

```javascript
function render() {
    board.forEach((value, index) => {
        const cellEl = cellEls[index];
        cellEl.textContent = value ?? '';
        cellEl.disabled = value !== null || !gameActive;
        cellEl.classList.toggle('x', value === 'X');
        cellEl.classList.toggle('o', value === 'O');
        cellEl.classList.toggle('winning-cell', winningLine?.includes(index) ?? false);
    });

    if (gameActive) {
        statusEl.textContent = `Player ${currentPlayer}'s turn`;
    }
}
```

Every state change — a move, a win, a reset — just mutates state and calls `render()`. This mirrors the unidirectional data flow of modern frameworks, but in 15 lines of vanilla JS.

---

### 2. Win Detection Across 8 Possible Patterns

**The Challenge:**
After every move, the game needs to check 3 rows, 3 columns, and 2 diagonals for a winner — and identify *which* cells won so they can be visually highlighted.

**The Solution:**
A declarative array of winning patterns combined with destructuring and a simple loop:

```javascript
const WIN_PATTERNS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
    [0, 4, 8], [2, 4, 6]              // diagonals
];

function checkWinner(board) {
    for (const pattern of WIN_PATTERNS) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return { winner: board[a], line: pattern };
        }
    }
    return null;
}
```

Returning the `pattern` array alongside the winner lets the `render()` function toggle a `.winning-cell` class on exactly the right cells — clean separation between detection and presentation.

---

### 3. Event Delegation on a Dynamic Grid

**The Challenge:**
The game board has 9 buttons. Attaching individual click handlers to each one is repetitive and hard to maintain. But with event delegation, how do you reliably identify which cell was clicked?

**The Solution:**
A single event listener on the parent `#board` element, using `event.target.closest('.btn')` to find the clicked cell and `data-index` attributes for identification:

```javascript
boardEl.addEventListener('click', handleCellClick);

function handleCellClick(event) {
    const clickedCell = event.target.closest('.btn');
    if (!clickedCell) return;

    const index = Number(clickedCell.dataset.index);
    if (!gameActive || board[index] !== null) return;

    board[index] = currentPlayer;
    // ... check winner, check draw, switch player
    render();
}
```

One listener instead of nine. `closest('.btn')` handles edge cases where a click lands on a child element. Data attributes avoid brittle index calculations from DOM position.

---

### 4. Persistent State Without a Backend

**The Challenge:**
Users expect their to-do tasks to survive page refreshes. Without a server or database, the data needs to persist locally, and the app needs to load it back on startup without breaking if storage is empty.

**The Solution:**
A thin `localStorage` wrapper that saves on every mutation and loads defensively on init:

```javascript
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const stored = localStorage.getItem('tasks');
    tasks = stored ? JSON.parse(stored) : [];
}

loadTasks();
renderTasks();
```

Every function that mutates the `tasks` array — `addTask`, `deleteTask`, `toggleTask` — calls `saveTasks()` as its last step, keeping the in-memory array and browser storage always in sync.

---

### 5. Immutable State Updates for Toggle and Delete

**The Challenge:**
Directly mutating objects inside an array makes it hard to reason about state changes and can introduce subtle bugs. How do you toggle a single task's `completed` status without mutating the original object?

**The Solution:**
Using `Array.map()` with the spread operator for toggle, and `Array.filter()` for delete — both return new arrays without mutating the original:

```javascript
function toggleTask(id) {
    tasks = tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
    );
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}
```

This pattern — borrowed from functional programming — produces predictable state transitions and makes it trivial to add features like undo in the future.

---

## 📁 Project Structure

```
Vanilla_projects/
│
├── index.html                # Landing page linking to all projects
├── Readme.md                 # You are here
│
├── Tic-Tac-Toe/
│   ├── index.html            # Accessible game markup (ARIA roles, data attributes)
│   ├── style.css             # Dark theme, CSS Grid board, CSS Custom Properties
│   └── app.js                # State-driven rendering, win detection, event delegation
│
└── To-Do-App/
    ├── index.html            # Semantic form with header/main/footer structure
    ├── style.css             # Flexbox layout, sticky footer, responsive container
    └── script.js             # CRUD operations, localStorage persistence, immutable updates
```

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/Vanilla_projects.git

# Navigate into the project
cd Vanilla_projects

# Open in your browser — no build step required!
# Simply open index.html in any modern browser
```

> **That's it.** No `npm install`. No `npm run build`. No environment variables. Just open the file and go.

---

## 🧠 Key Takeaways

1. **State-driven rendering works without React.** A `render()` function that syncs DOM with plain JS variables is the same core idea — just without the abstraction.
2. **Accessibility isn't a library — it's markup.** A few ARIA attributes (`role="grid"`, `aria-live="polite"`) make a custom widget navigable by screen readers.
3. **`localStorage` is an underrated database.** For client-side apps, it's zero-config persistence that survives page refreshes and browser restarts.
4. **Modern JS is powerful enough.** Optional chaining, nullish coalescing, destructuring, spread syntax, and array methods like `filter`/`map`/`every` replace entire libraries worth of utility functions.
5. **Constraints breed clarity.** Without a component library, you build reusable patterns yourself — and understand *why* frameworks exist.

---

## 🤝 Contributing

Have an idea for a new vanilla project? Found a bug? Want to improve the code?

1. **Fork** this repository
2. **Create** a feature branch (`git checkout -b feature/amazing-project`)
3. **Commit** your changes (`git commit -m 'Add amazing vanilla project'`)
4. **Push** to the branch (`git push origin feature/amazing-project`)
5. **Open** a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  <strong>Built by Dhruv Gupta.</strong><br/>
  <em>"Simplicity is the ultimate sophistication." — Leonardo da Vinci</em>
</p>
