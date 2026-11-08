
import { getSelectedPlayer } from "./storage.js";

// Images dyal avatars
const avatars = {
    knight: "./img/Roi médiéval barbu au manteau rouge.png",
    king: "./img/Avatar circulaire d’un chevalier médiéval cuirassé.png",
    assassin: "./img/Portrait médiéval d’une femme au manteau vert.png",
    queen: "./img/Portrait médiéval d’une femme voilée.png"
};

// Images dyal cartes
const cardImages = {
    empereur: "./img/Carte de l’Empereur en style vintage.png",
    esclave: "./img/Esclave.png",
    citoyen: "./img/Carte médiévale des citoyens artisans.png"
};

const cardBack = "./img/Dos de carte royal rouge et or (1).png";


// Display Players
export function displayPlayers(players) {

    const playersList = document.querySelector("#players-list");
    const selectedPlayerId = getSelectedPlayer();

    playersList.innerHTML = "";

    if (players.length === 0) {
        playersList.textContent = "Aucun joueur enregistré.";
        return;
    }

    players.forEach(player => {

        const isActive = player.id === selectedPlayerId;

        const article = document.createElement("article");

        article.dataset.playerId = player.id;

        article.className = `flex items-center gap-2 rounded-lg border-2 p-2 sm:gap-3 ${
            isActive
                ? "border-black bg-orange-200"
                : "border-[#65602C] bg-orange-200"
        }`;

        article.innerHTML = `
            <img
                src="${avatars[player.avatar]}"
                alt="Avatar ${player.nickname}"
                class="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12"
            >

            <div class="min-w-0 flex-1">

                <h3 class="font-body text-lg font-semibold text-[#422B18] sm:text-2xl">
                    ${player.nickname}
                </h3>

                <p class="mt-1 font-body text-sm text-[#228b45] sm:text-lg">
                    ${isActive ? "Joueur actif" : "Choisir ce joueur"}
                </p>

                <p class="font-body text-sm text-[#634a30]">
                    Parties jouées : ${player.gamesPlayed || 0}
                </p>

            </div>

            <div class="flex shrink-0 items-center gap-2 sm:gap-4">

                <button
                    type="button"
                    data-action="edit"
                    aria-label="Modifier ${player.nickname}"
                    class="rounded-lg border border-[#B18A5B] p-2 text-xl text-[#684B28] sm:p-3"
                >
                    ✎
                </button>

                <button
                    type="button"
                    data-action="delete"
                    aria-label="Supprimer ${player.nickname}"
                    class="rounded-lg border border-[#B66B4D] p-2 text-xl text-[#8B2E22] sm:p-3"
                >
                    <img src="./img/bin.png" alt="" class="h-5 w-5 object-contain sm:h-6 sm:w-6">
                </button>

            </div>
        `;

        playersList.append(article);

    });
}


// Display player cards
export function displayPlayerHand(hand) {

    const playerCards = document.querySelector("#player-cards");

    playerCards.innerHTML = "";

    hand.forEach((card, index) => {

        const button = document.createElement("button");

        button.type = "button";
        button.dataset.cardIndex = index;

        button.className = "flex flex-1 justify-center";

        button.innerHTML = `
            <img
                src="${cardImages[card.type]}"
                alt="Carte ${card.type}"
                class="w-full max-w-24 object-contain"
            >
        `;

        playerCards.append(button);

    });
}


// Display opponent cards hidden
export function displayOpponentHand(hand) {

    const opponentCards = document.querySelector("#opponent-cards");

    opponentCards.innerHTML = "";

    hand.forEach(() => {

        const div = document.createElement("div");

        div.className = "flex flex-1 justify-center";

        div.innerHTML = `
            <img
                src="${cardBack}"
                alt="Carte cachée de l'adversaire"
                class="w-full max-w-24 object-contain"
            >
        `;

        opponentCards.append(div);

    });
}


// Display cards in battle area
export function displayBattleCards(playerCard, computerCard, result) {

    const playerImage = document.querySelector("#player-card-image");
    const playerName = document.querySelector("#player-card-name");

    const computerImage = document.querySelector("#computer-card-image");
    const computerName = document.querySelector("#computer-card-name");

    const battleResult = document.querySelector("#battle-result");

    // Display player card
    playerImage.src = cardImages[playerCard.type];
    playerImage.alt = `Carte ${playerCard.type}`;
    playerImage.classList.remove("hidden");

    playerName.textContent = playerCard.type;

    // Display computer card
    computerImage.src = cardImages[computerCard.type];
    computerImage.alt = `Carte ${computerCard.type}`;
    computerImage.classList.remove("hidden");

    computerName.textContent = computerCard.type;

    // Display result
    if (result === "victoire") {
        battleResult.textContent = "Vous avez gagné ce duel !";
    } else if (result === "défaite") {
        battleResult.textContent = "Vous avez perdu ce duel !";
    } else {
        battleResult.textContent = "Égalité !";
    }
}


// Display game information
export function displayGameInfo(player, game, startingCamp) {

    const playerCamp = game.playerCamp;

    const computerCamp = playerCamp === "empereur"
        ? "esclave"
        : "empereur";

    document.querySelector("#player-avatar").src = avatars[player.avatar];

    document.querySelector("#player-name-display").textContent = player.nickname;

    document.querySelector("#player-camp-display").textContent = playerCamp;

    document.querySelector("#player-score-display").textContent =
        `Score : ${game.playerScore}`;

    document.querySelector("#computer-camp-display").textContent = computerCamp;

    document.querySelector("#computer-score-display").textContent =
        `Score : ${game.computerScore}`;

    document.querySelector("#manche-number").textContent =
        game.currentManche;

    document.querySelector("#starting-camp").textContent =
        `${startingCamp} commence`;

    document.querySelector("#current-camp").textContent =
        playerCamp;
}
