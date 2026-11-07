// Création dyal 5 cartes 7sab l camp
export function createHand(camp) {
    const hand = [
        { type: "citoyen" },
        { type: "citoyen" },
        { type: "citoyen" },
        { type: "citoyen" }
    ];

    // Ila kan empereur nzido empereur, sinon esclave
    const specialCard = camp === "empereur" ? "empereur" : "esclave";

    hand.push({ type: specialCard });
    return hand;
}


/* Get the opponent's camp */
export function getOpponentCamp(playerCamp) {
    return playerCamp === "empereur" ? "esclave" : "empereur";
}

// Comparaison bin carte dyal player w computer
export function duel(playerCard, computerCard) {

    if (playerCard.type === computerCard.type) {
        return "égalité";
    }

    // Hado homa les 3 7alat fin player kayrbe7
    if (
        (playerCard.type === "empereur" && computerCard.type === "citoyen") ||
        (playerCard.type === "citoyen" && computerCard.type === "esclave") ||
        (playerCard.type === "esclave" && computerCard.type === "empereur")
    ) {
        return "victoire";
    }

    return "défaite";
}


// Choix aleatoire dyal carte mn 3and computer
export function computerChooseCard(hand) {
    const randomIndex = Math.floor(Math.random() * hand.length);
    return hand[randomIndex];
}


// Suppression dyal carte li tplayed
export function removeCard(hand, card) {

    const copyhand = [...hand];
    const cardIndex = copyhand.indexOf(card);


    if (cardIndex !== -1) {
        copyhand.splice(cardIndex, 1);
    }

    return copyhand;
}


// Création dyal Manche jdida
export function createManche() {
    return {
        duelsPlayed: 0, // 3adad dyal duels li tl3bo
        winner: null,   // Mazal mat7dded 7ta winner
        isFinished: false // Wach salat l manche
    };
}
// Kat7edded chkon kaybda kol duel
export function getStartingCamp(manche) {
    return manche.duelsPlayed % 2 === 0
        ? "empereur"
        : "esclave";
}

// Mise à jour dyal Manche mn ba3d kol duel
export function updateManche(manche, result) {

    manche.duelsPlayed++;

    // Ila ma kanch draw, rah kayn winner w katssali manche
    if (result !== "égalité") {
        manche.winner = result === "victoire" ? "player" : "computer";
        manche.isFinished = true;
    }

    // Ila wslna l 5 duels, katssali manche
    if (manche.duelsPlayed >= 5) {
        manche.isFinished = true;
    }

    return manche;
}
// function kitjma3 lina ga3 logique dyal duel kaml f functin wa7da
export function playDuel(manche, playerHand, computerHand, playerCard) {

    // Computer chooses a card
    const computerCard = computerChooseCard(computerHand);

    // Compare both cards
    const result = duel(playerCard, computerCard);

    // Remove played cards
    const newPlayerHand = removeCard(playerHand, playerCard);
    const newComputerHand = removeCard(computerHand, computerCard);

    // Update manche
    updateManche(manche, result);

    return {
        playerCard,
        computerCard,
        result,
        playerHand: newPlayerHand,
        computerHand: newComputerHand,
        manche
    };
}

export function createGameState(){
    return {
        currentManche: 1,
        playerCamp: "empereur",
        playerScore: 0,
        computerScore: 0,
        isGameFinished: false
    };
}


/* Update game after a manche ends */
export function updateGameAfterManche(game, winner) {

    // Get the winner's camp
    const winnerCamp = winner === "player"
        ? game.playerCamp
        : getOpponentCamp(game.playerCamp);

    // Calculate points according to the winner's camp
    const points = winnerCamp === "empereur" ? 1 : 5;

    // Add points to the winner
    if (winner === "player") {
        game.playerScore += points;
    } else {
        game.computerScore += points;
    }

    // Check if the game is finished
    if (game.currentManche === 12) {
        game.isGameFinished = true;
        return game;
    }

    // Switch camps after manches 3, 6 and 9
    if (game.currentManche % 3 === 0) {
        game.playerCamp = getOpponentCamp(game.playerCamp);
    }

    // Move to the next manche
    game.currentManche++;

    return game;
}

// Katssali l-Manche w katwjed l-Manche jdida
export function finishManche(game, manche) {
    // Kan7esbo n9at dyal lfa2iz w kan7edto 7alat lgame
    updateGameAfterManche(game, manche.winner);

    // Ila salat lgame, manwjedoch Manche jdida
    if (game.isGameFinished) {
        return {
            playerHand: null,
            computerHand: null,
            newManche: null,
            game
        };
    }

    // Kan3awdo nwjedo 5 cartes lkol joueur
    const playerHand = createHand(game.playerCamp);
    const computerHand = createHand(getOpponentCamp(game.playerCamp));

    // Kanbdaw Manche jdida
    const newManche = createManche();

    return {
        playerHand,
        computerHand,
        newManche,
        game
    };
}

