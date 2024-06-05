export const languages = [
    {
        profile: "Switch language",
        deal: "Deal",
        hit: "Hit",
        stand: "Stand",
        quit: "Quit",
        deckEmptyMsg: "Deck is empty, refresh for a new game.",
        dealerHand: "Dealer",
        dealerScore: "Dealer Score: ",
        playerHand: "Your Hand",
        playerScore: "Your Score: ",
        playing: "Playing",
        win: "Win",
        lose: "Lose",
        waiting: "Waiting",
        restartGame:"Restart Game",
        playerWins: 'Player Wins',
        dealerWins: 'Dealer Wins',
        restart: 'Restart'
    },
    {
        restart: 'Recomeçar',
        playerWins: 'Vitórias do Jogador',
        dealerWins: 'Vitórias do Negociador',
        profile: "Trocar idioma",
        deal: "Negociar",
        hit: "Bater",
        stand: "Esperar",
        quit: "Desistir",
        deckEmptyMsg: "O deck está vazio, recarregue a página para iniciar um novo jogo.",
        dealerHand: "Negociador",
        dealerScore: "Pontuação do negociador: ",
        playerHand: "Sua mão",
        playerScore: "Sua pontuação: ",
        playing: "Jogando",
        win: "Vitória",
        lose: "Derrota",
        waiting: "Aguardando",
        restartGame:"Recomeçar jogo"

    }
];

var index = 0;

export const getIndex = () => {
    return index;
}

export const switchLanguage = () => {
    index = index === 0 ? 1 : 0;
}