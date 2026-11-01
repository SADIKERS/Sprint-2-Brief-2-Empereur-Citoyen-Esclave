
import {
    getPlayers,
    savePlayers,
    getSelectedPlayer,
    saveSelectedPlayer
} from "./storage.js";


// 1. Validate nickname
export function validateNickname(nickname, players, currentPlayerId = null) {

    const cleanNickname = nickname.trim();

    const nicknameRegex = /^[A-Za-z0-9_]{3,15}$/;

    if (!nicknameRegex.test(cleanNickname)) {
        return "Le pseudo doit contenir entre 3 et 15 caractères.";
    }

    const alreadyExists = players.some(player =>
        player.id !== currentPlayerId &&
        player.nickname.toLowerCase() === cleanNickname.toLowerCase()
    );

    if (alreadyExists) {
        return "Ce pseudo existe déjà.";
    }

    return null;
}


// 2. Add player
export function addPlayer(nickname, avatar) {

    const players = getPlayers();

    const error = validateNickname(nickname, players);

    if (error) {
        return { success: false, message: error };
    }

    const player = {
        id: `p_${Date.now()}`,
        nickname: nickname.trim(),
        avatar: avatar,
        createdAt: new Date().toISOString().slice(0, 10)
    };

    const updatedPlayers = [...players, player];

    savePlayers(updatedPlayers);

    return { success: true, player };
}


// 3. Update player
export function updatePlayer(playerId, nickname, avatar) {

    const players = getPlayers();

    const playerExists = players.find(player => player.id === playerId);

    if (!playerExists) {
        return { success: false, message: "Joueur introuvable." };
    }

    const error = validateNickname(nickname, players, playerId);

    if (error) {
        return { success: false, message: error };
    }

    const updatedPlayers = players.map(player => {

        if (player.id === playerId) {
            return {
                ...player,
                nickname: nickname.trim(),
                avatar: avatar
            };
        }

        return player;
    });

    savePlayers(updatedPlayers);

    return { success: true };
}


// 4. Delete player
export function deletePlayer(playerId) {

    const players = getPlayers();

    const updatedPlayers = players.filter(player => player.id !== playerId);

    if (players.length === updatedPlayers.length) {
        return false;
    }

    savePlayers(updatedPlayers);

    // If the deleted player was selected
    if (getSelectedPlayer() === playerId) {
        localStorage.removeItem("selectedPlayer");
    }

    return true;
}


// 5. Select player
export function selectPlayer(playerId) {

    const players = getPlayers();

    const playerExists = players.some(player => player.id === playerId);

    if (!playerExists) {
        return false;
    }

    saveSelectedPlayer(playerId);

    return true;
}
