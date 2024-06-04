import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { statuses } from '../reducers/game';
import { getIndex, languages, setIndex, switchLanguage } from '../config/languages/languages';

var language = languages[getIndex()];

const __switchLanguage = () => {
  switchLanguage();
  language = languages[getIndex()];
}

export const Card = ({ color, face, faceDown }) =>
    faceDown
      ? <span>? </span>
      : <span style={ { color } }>{ face } </span>;

export const Hand = ({ label, cards }) =>
  <div>
    <label>{ label }</label>
    { cards.map((card, i) =>
      <Card
          face={ card.face }
          faceDown={ card.faceDown }
          color={ card.color }
          key={ i }
      />
    )}
  </div>;

export const BlackjackGame = ({
    newGame,
    deal,
    hit,
    stand,
    quit,
    drawPile,
    dealerHand,
    playerHand,
    dealerScore,
    playerScore,
    status
}) =>
  <div>
    <button disabled ={ drawPile && drawPile.length === 0 }onClick={ deal }>{language.deal}</button>
    <button onClick={()=> {
      __switchLanguage();
      quit();
     }}>{language.profile}</button>
    <hr />
    { drawPile && drawPile.length === 0 &&
      [<div>{language.deckEmptyMsg} <button onClick={newGame}>Restart game</button></div>,
       <hr />] }
    <Hand label={language.dealerHand} cards={ dealerHand } />
    <div>{language.dealerScore} {
        status === statuses.PLAYING
            ? '?'
            : dealerScore }</div>
    <hr />
    <Hand label={language.playerHand} cards={ playerHand } />
    <div>{language.playerScore} { playerScore }</div>
    <hr />
    <button disabled = {dealerHand.length ===0 ||status!=statuses.PLAYING ||drawPile && drawPile.length === 0 } onClick={ () => hit('player') }>{language.hit}</button>
    <button disabled = {dealerHand.length ===0 ||status!=statuses.PLAYING ||drawPile && drawPile.length === 0} onClick={ stand }>{language.stand}</button>
    <button disabled = {dealerHand.length ===0 ||status!=statuses.PLAYING ||drawPile && drawPile.length === 0 } onClick={ quit }>{language.quit}</button>
    <hr />
    <div style={{ fontWeight: 'bold' }}>{ status }</div>
  </div>;

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, actions)(BlackjackGame);