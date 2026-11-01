
import {
    addPlayer,
    updatePlayer,
    deletePlayer,
    selectPlayer
} from "./players.js";

import {
    getPlayers,
    getSelectedPlayer
} from "./storage.js";


// 1. Get HTML elements
const playerForm = document.querySelector("#player-form");
const playerName = document.querySelector("#player-name");
const formError = document.querySelector("#form-error");
const avatarOptions = document.querySelector("#avatar-options");
const playersList = document.querySelector("#players-list");


// 2. Variables
let selectedAvatar = null;
let editingPlayerId = null;


// 3. Avatar images
const avatars = {
    knight: "./img/Roi médiéval barbu au manteau rouge.png",
    king: "./img/Avatar circulaire d’un chevalier médiéval cuirassé.png",
    assassin: "./img/Portrait médiéval d’une femme au manteau vert.png",
    queen: "./img/Portrait médiéval d’une femme voilée.png"
};


// 4. Display players
function displayPlayers() {

    const players = getPlayers();
    const activePlayerId = getSelectedPlayer();

    playersList.innerHTML = "";

    if (players.length === 0) {
        playersList.innerHTML = `
            <p class="py-8 text-center font-body text-lg text-[#634a30]">
                Aucun joueur pour le moment.
            </p>
        `;
        return;
    }

    players.forEach(player => {

        const isActive = player.id === activePlayerId;

        const article = document.createElement("article");

        article.dataset.playerId = player.id;

        article.className = `
            flex items-center gap-2 rounded-lg border-2 p-2 sm:gap-3
            ${isActive
                ? "border-[#812D22] bg-orange-200"
                : "border-[#B18A5B] bg-orange-100"}
        `;

        const image = avatars[player.avatar];

        article.innerHTML = `
            <img
                src="${image}"
                alt="Avatar ${player.nickname}"
                class="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12"
            >

            <div class="min-w-0 flex-1">

                <h3 class="font-body text-lg font-semibold text-[#422B18] sm:text-2xl">
                    ${player.nickname}
                </h3>

                <p class="mt-1 font-body text-sm text-[#634a30]">
                    ${isActive ? "♛ Joueur actif" : "Joueur"}
                </p>

                <p class="font-body text-xs text-[#634a30]">
                    Parties jouées : ${player.gamesPlayed ?? 0}
                </p>

            </div>

            <div class="flex shrink-0 items-center gap-2">

                <button
                    type="button"
                    data-action="select"
                    class="rounded-lg border border-[#B18A5B] px-2 py-2 text-sm text-[#684B28]"
                >
                    ${isActive ? "Actif" : "Choisir"}
                </button>

                <button
                    type="button"
                    data-action="edit"
                    aria-label="Modifier ${player.nickname}"
                    class="rounded-lg border border-[#B18A5B] p-2 text-lg text-[#684B28]"
                >
                    ✎
                </button>

                <button
                    type="button"
                    data-action="delete"
                    aria-label="Supprimer ${player.nickname}"
                    class="rounded-lg border border-[#B66B4D] p-2 text-lg text-[#8B2E22]"
                >
                    ♜
                </button>

            </div>
        `;

        playersList.append(article);
    });
}


