
import {
    getPlayers,
    savePlayers,
    getSelectedPlayer,
    saveSelectedPlayer
} from "./storage.js";


// Validate nickname
function validateNickname(nickname, currentPlayerId = null) {

    const nicknameRegex = /^[A-Za-z0-9_]{3,15}$/;

    if (!nicknameRegex.test(nickname)) {
        return {
            success: false,
            message: "Le pseudo doit contenir entre 3 et 15 caractères : lettres, chiffres et _."
        };
    }

    const players = getPlayers();

    const nicknameExists = players.some(player =>
        player.id !== currentPlayerId &&
        player.nickname.toLowerCase() === nickname.toLowerCase()
    );

    if (nicknameExists) {
        return {
            success: false,
            message: "Ce pseudo existe déjà."
        };
    }

    return {
        success: true
    };
}


// Add Player
export function addPlayer(nickname, avatar) {

    const validation = validateNickname(nickname);

    if (!validation.success) {
        return validation;
    }

    if (!avatar) {
        return {
            success: false,
            message: "Veuillez choisir un avatar."
        };
    }

    const players = getPlayers();

    const newPlayer = {
        id: `p_${Date.now()}`,
        nickname: nickname,
        avatar: avatar,
        createdAt: new Date().toISOString().split("T")[0]
    };

    savePlayers([...players, newPlayer]);

    return {
        success: true,
        player: newPlayer
    };
}


// Edit Player
export function updatePlayer(playerId, nickname, avatar) {

    const validation = validateNickname(nickname, playerId);

    if (!validation.success) {
        return validation;
    }

    if (!avatar) {
        return {
            success: false,
            message: "Veuillez choisir un avatar."
        };
    }

    const players = getPlayers();

    const playerIndex = players.findIndex(player =>
        player.id === playerId
    );

    if (playerIndex === -1) {
        return {
            success: false,
            message: "Joueur introuvable."
        };
    }

    const updatedPlayer = {
        ...players[playerIndex],
        nickname: nickname,
        avatar: avatar
    };

    const updatedPlayers = [...players];

    updatedPlayers[playerIndex] = updatedPlayer;

    savePlayers(updatedPlayers);

    return {
        success: true,
        player: updatedPlayer
    };
}


// Delete Player
export function deletePlayer(playerId) {

    const players = getPlayers();

    const playerExists = players.some(player =>
        player.id === playerId
    );

    if (!playerExists) {
        return {
            success: false,
            message: "Joueur introuvable."
        };
    }

    const updatedPlayers = players.filter(player =>
        player.id !== playerId
    );

    savePlayers(updatedPlayers);

    if (getSelectedPlayer() === playerId) {
        saveSelectedPlayer("");
    }

    return {
        success: true
    };
}


// Select Player
export function selectPlayer(playerId) {

    const players = getPlayers();

    const player = players.find(player =>
        player.id === playerId
    );

    if (!player) {
        return {
            success: false,
            message: "Joueur introuvable."
        };
    }

    saveSelectedPlayer(playerId);

    return {
        success: true,
        player: player
    };
}
