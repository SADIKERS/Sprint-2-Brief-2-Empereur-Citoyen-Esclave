// Get players from LocalStorage
export function getPlayers(){
    return JSON.parse(localStorage.getItem("players")) || [];
}

// Save players in LocalStorage
export function savePlayers(players){
    localStorage.setItem("players", JSON.stringify(players));
}

// Get selected player
export function getSelectedPlayer(){
    return localStorage.getItem("selectedPlayer");
}
// Save selected player
export function saveSelectedPlayer(playerID){
    localStorage.setItem("selectedPlayer", playerID);
}