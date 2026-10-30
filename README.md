# Empereur, Citoyen, Esclave

A web-based card game where players can create profiles, challenge the computer, and track their match history.

## About the Project

**Empereur, Citoyen, Esclave** is a card game inspired by a simple hierarchy of power. Each player competes against the computer in a series of duels, using strategy and special cards to win points.

The project focuses on building an interactive web application with player management, game logic, and match history.

## Live Demo

**Website:** [View the live application](YOUR_GITHUB_PAGES_URL)

*The live link will be added after deployment.*

## Features

### Player Profiles
- Create a profile with a unique nickname and avatar.
- Edit and delete player profiles.
- Validate nicknames and prevent duplicates.
- Select the active player before starting a game.

### Card Game
- Play against the computer in 12 rounds.
- Choose cards and resolve duels according to the game rules.
- Earn points based on the current camp.
- Track the score and the progress of the game.
- Replay after the game ends.

### Match History
- Save completed games.
- Search games by player nickname.
- Filter matches by result and date.
- Delete match records with confirmation.

## Game Rules

The game has three card types:

- **Empereur:** Defeats Citoyen.
- **Citoyen:** Defeats Esclave.
- **Esclave:** Defeats Empereur.

A complete game contains 12 rounds. Winning in the Empereur camp gives 1 point, while winning in the Esclave camp gives 5 points.

## Technologies

- HTML5
- Tailwind CSS
- JavaScript (ES6+)
- LocalStorage
- Git and GitHub

## 📁 Project Structure

```text
empereur-citoyen-esclave/
│
├── index.html
├── players.html
├── game.html
├── history.html
│
├── src/
│   ├── main.js
│   ├── players.js
│   ├── game.js
│   ├── history.js
│   ├── storage.js
│   ├── ui.js
│   └── input.css
│
├── dist/
│   └── output.css
│
├── package.json
├── package-lock.json
└── README.md
```



## Getting Started

1. Clone the repository.
2. Open the project in Visual Studio Code.
3. Configure the required dependencies and Tailwind CSS.
4. Run the application using Live Server.

JavaScript modules require a local development server rather than opening the HTML file directly.

## Development Workflow

The project uses Git branches and Pull Requests to organize development.

- `main`: Stable version.
- `develop`: Development and integration.
- `feature/*`: Individual features.

Each feature is developed on its own branch and submitted through a Pull Request for review.

## Author

**Name:** abdelilah sadik

## License

This project was created for educational purposes as part of the YouCode training program.
