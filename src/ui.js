
import { getSelectedPlayer } from "./storage.js";


// Avatar images
const avatars = {
    knight: "./img/Roi médiéval barbu au manteau rouge.png",
    king: "./img/Avatar circulaire d’un chevalier médiéval cuirassé.png",
    assassin: "./img/Portrait médiéval d’une femme au manteau vert.png",
    queen: "./img/Portrait médiéval d’une femme voilée.png"
};


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

        article.className = `flex items-center gap-2 rounded-lg border-2 p-2 sm:gap-3 ${isActive
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
