
import {
    addPlayer,
    updatePlayer,
    deletePlayer,
    selectPlayer
} from "./players.js";

import {
    createHand,
    createManche,
    createGameState,
    getStartingCamp,
    playDuel,
    finishManche
} from "./game.js";

import {
    getPlayers,
    getSelectedPlayer
} from "./storage.js";

import {
    displayPlayers,
    displayPlayerHand,
    displayOpponentHand,
    displayBattleCards,
    displayGameInfo
} from "./ui.js";


// Players Page
function initPlayersPage() {
    // HTML Elements
    const playerForm = document.querySelector("#player-form");
    const playerNameInput = document.querySelector("#player-name");
    const avatarOptions = document.querySelector("#avatar-options");
    const playersList = document.querySelector("#players-list");
    const formError = document.querySelector("#form-error");
    const submitButton = playerForm.querySelector('button[type="submit"]');


    // Variables
    let selectedAvatar = null;
    let editingPlayerId = null;


    // Display Players
    function refreshPlayers() {

        const players = getPlayers();

        displayPlayers(players);

    }


    // Reset Form
    function resetPlayerForm() {

        playerForm.reset();

        selectedAvatar = null;

        editingPlayerId = null;

        formError.textContent = "";

        submitButton.textContent = "Ajouter le joueur";

        const avatarButtons = avatarOptions.querySelectorAll("[data-avatar]");

        avatarButtons.forEach(button => {
            button.classList.remove("ring-2", "ring-[#8B2E22]");
        });

    }


    // Select Avatar
    avatarOptions.addEventListener("click", (event) => {

        const avatarButton = event.target.closest("[data-avatar]");

        if (!avatarButton) {
            return;
        }

        selectedAvatar = avatarButton.dataset.avatar;

        const avatarButtons = avatarOptions.querySelectorAll("[data-avatar]");

        avatarButtons.forEach(button => {
            button.classList.remove("ring-2", "ring-[#8B2E22]");
        });

        avatarButton.classList.add("ring-2", "ring-[#8B2E22]");

    });


    // Add or Update Player
    playerForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const nickname = playerNameInput.value.trim();

        let result;

        if (editingPlayerId) {

            result = updatePlayer(
                editingPlayerId,
                nickname,
                selectedAvatar
            );

        } else {

            result = addPlayer(
                nickname,
                selectedAvatar
            );

        }

        if (!result.success) {

            formError.textContent = result.message;

            return;
        }

        resetPlayerForm();

        refreshPlayers();

    });


    // Players List Events
    playersList.addEventListener("click", (event) => {

        const article = event.target.closest("[data-player-id]");

        if (!article) {
            return;
        }

        const playerId = article.dataset.playerId;

        const actionButton = event.target.closest("[data-action]");


        // Edit Player
        if (actionButton?.dataset.action === "edit") {

            const players = getPlayers();

            const player = players.find(player =>
                player.id === playerId
            );

            if (!player) {
                return;
            }

            editingPlayerId = playerId;

            playerNameInput.value = player.nickname;

            selectedAvatar = player.avatar;

            const avatarButtons = avatarOptions.querySelectorAll("[data-avatar]");

            avatarButtons.forEach(button => {

                button.classList.remove("ring-2", "ring-[#8B2E22]");

                if (button.dataset.avatar === selectedAvatar) {
                    button.classList.add("ring-2", "ring-[#8B2E22]");
                }

            });

            submitButton.textContent = "Modifier le joueur";

            formError.textContent = "";

            return;
        }


        // Delete Player
        if (actionButton?.dataset.action === "delete") {

            const confirmation = confirm(
                "Voulez-vous vraiment supprimer ce joueur ?"
            );

            if (!confirmation) {
                return;
            }

            const result = deletePlayer(playerId);

            if (result.success) {

                if (editingPlayerId === playerId) {
                    resetPlayerForm();
                }

                refreshPlayers();

            }

            return;
        }


        // Select Player
        const result = selectPlayer(playerId);

        if (result.success) {
            refreshPlayers();
        }

    });


    // Initial Display
    refreshPlayers();
}
// Check if we are on Players Page
if (document.querySelector("#player-form")) {
    initPlayersPage();
}

// ==============================
// GAME PAGE
// ==============================

function initGamePage() {

    const gameBoard = document.querySelector("#game-board");

    // Get selected player
    const selectedPlayerId = getSelectedPlayer();

    const players = getPlayers();

    const player = players.find(player =>
        player.id === selectedPlayerId
    );

    // Check if a player is selected
    if (!player) {

        alert("Veuillez choisir un joueur avant de commencer.");

        window.location.href = "./players.html";

        return;
    }


    // Create game
    const game = createGameState();

    let manche = createManche();

    let playerHand = createHand(game.playerCamp);

    let computerHand = createHand(
        game.playerCamp === "empereur" ? "esclave" : "empereur"
    );


    // Display initial game
    displayPlayerHand(playerHand);

    displayOpponentHand(computerHand);

    displayGameInfo(
        player,
        game,
        getStartingCamp(manche)
    );


    // Player chooses a card
    gameBoard.addEventListener("click", (event) => {

        const cardButton = event.target.closest("[data-card-index]");

        if (!cardButton) {
            return;
        }

        if (manche.isFinished || game.isGameFinished) {
            return;
        }

        const cardIndex = Number(cardButton.dataset.cardIndex);

        const selectedCard = playerHand[cardIndex];

        if (!selectedCard) {
            return;
        }


        // Play duel
        const result = playDuel(
            manche,
            playerHand,
            computerHand,
            selectedCard
        );


        // Update hands
        playerHand = result.playerHand;
        computerHand = result.computerHand;


        // Display battle result
        displayBattleCards(
            result.playerCard,
            result.computerCard,
            result.result
        );


        // Display remaining cards
        displayPlayerHand(playerHand);

        displayOpponentHand(computerHand);


        // Check if manche is finished
        if (manche.isFinished) {

            const finishedManche = finishManche(game, manche);


            // Check if game is finished
            if (game.isGameFinished) {

                document.querySelector("#battle-result").textContent =
                    game.playerScore > game.computerScore
                        ? "Félicitations ! Vous avez gagné la partie."
                        : game.playerScore < game.computerScore
                            ? "L'ordinateur a gagné la partie."
                            : "La partie est terminée : égalité !";

                displayPlayerHand([]);
                displayOpponentHand([]);

                displayGameInfo(
                    player,
                    game,
                    getStartingCamp(manche)
                );

                return;
            }


            // Prepare next manche
            playerHand = finishedManche.playerHand;
            computerHand = finishedManche.computerHand;
            manche = finishedManche.newManche;


            // Display new manche
            displayPlayerHand(playerHand);

            displayOpponentHand(computerHand);

            displayGameInfo(
                player,
                game,
                getStartingCamp(manche)
            );

            return;
        }


        // Update game information
        displayGameInfo(
            player,
            game,
            getStartingCamp(manche)
        );

    });

}


// Check Game Page
if (document.querySelector("#game-board")) {
    initGamePage();
}
