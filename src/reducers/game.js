import { newShuffledPokerDeck, calculatePlayerScore } from '../cards';

export const statuses = {
  PLAYING: 'Playing',
  WIN: 'Win',
  LOSE: 'Lose'
};

const initialState = {
  drawPile: newShuffledPokerDeck(),
  dealerHand: [],
  dealerScore: 0,
  playerHand: [],
  playerScore: 0,
  status: statuses.PLAYING
};

const calculateOutcomeStatus = (playerScore, dealerScore) => {
  if (playerScore === 21) return statuses.WIN;
  if (playerScore > 21 || dealerScore === 21) return statuses.LOSE;
  if (dealerScore > 21 || playerScore > dealerScore) return statuses.WIN;
  if (playerScore < dealerScore) return statuses.LOSE;
  return statuses.PLAYING;
};

const revealDealerHand = (dealerHand) => {
  const turnAllFaceDown =  c => ({ ...c, faceDown: false });
  return dealerHand.map(turnAllFaceDown);
};

const dealCards = (state) => {
  let [playerCard1, dealerCard1, playerCard2, dealerCard2] = state.drawPile;
  dealerCard1 = { ...dealerCard1, faceDown: true };

  return {
    ...state,
    drawPile: state.drawPile.slice(4),
    dealerHand: [dealerCard1, dealerCard2],
    playerHand: [playerCard1, playerCard2],
    status: statuses.PLAYING
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DEAL':
      return dealCards(state);

    case 'HIT':
      const [drawnCard, ...remainingPile] = state.drawPile;
      const hitHandKey = `${action.who}Hand`;
      const hitHand = state[hitHandKey];

      return {
        ...state,
        drawPile: remainingPile,
        [hitHandKey]: [...hitHand, drawnCard]
      };

    case 'TALLY':
      return {
        ...state,
        dealerScore: calculatePlayerScore(state.dealerHand),
        playerScore: calculatePlayerScore(state.playerHand)
      };

    case 'OUTCOME':
      return {
        ...state,
        dealerHand: revealDealerHand(state.dealerHand),
        status: calculateOutcomeStatus(state.playerScore, state.dealerScore)
      };
    
      case 'QUIT':
        return {
          ...state,
          dealerHand: [],
          playerHand: [],
          dealerScore: 0,
          playerScore: 0,
          status: ''
        }

    default:
      return state;
  }
};

export default reducer;