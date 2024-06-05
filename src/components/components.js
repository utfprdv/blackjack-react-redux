import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { statuses } from '../reducers/game';
import { getIndex, languages, switchLanguage } from '../config/languages/languages';

var language = languages[getIndex()];

const __switchLanguage = () => {
  switchLanguage();
  language = languages[getIndex()];
}

const __getStatus = (status) => {
  switch(status){
    case 'Playing':
      return language.playing
    case 'Win':
      return language.win
    case 'Lose':
      return language.lose
    case 'Waiting':
      return language.waiting
    break;
  }
}

export const Card = ({ color, face, faceDown }) =>
    faceDown
      ? (<div className="grid-item card">
      <div className="top-left">
        <div>?</div>
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div className="bottom-right">
        <div>?</div>
      </div>
    </div>)
      : (
        <div className="grid-item card">
          <div className="top-left">
            <div style={{ color }}>{ face }</div>
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div className="bottom-right">
            <div style={{ color }}>{ face }</div>
          </div>
        </div>
      );

export const Hand = ({ label, cards, score }) =>
  <div className="hand-wrapper">
    <div>
      <label className="hand-label">{ label }</label> <span style={{ background: 'white', color: 'rgb(53,101,77)', padding: 2, borderRadius: 4 }}>{score}</span>
    </div>
    <div className="hand">
      { cards.map((card, i) =>
        <Card
            face={ card.face }
            faceDown={ card.faceDown }
            color={ card.color }
            key={ i }
        />
      )}
      {cards.length === 0 && (
        <div className="grid-item card">
        <div className="top-left">
          <div>?</div>
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div className="bottom-right">
          <div>?</div>
        </div>
      </div>
      )}
    </div>
  </div>;

const Modal = ({ children, isOpen, onClick, score}) => {
  return (
    isOpen ? <div className='backdrop' onClick={() => {
      onClick();
      score(children === 'Win' ? 'player' : 'dealer')
    }}>
      <div className='modal'>
        <div className='modal-header'>
          <button>Close</button>
        </div>
        <div className='modal-content'>
          {children}
        </div>
      </div>
    </div> : null
  )
}

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
    status,
    playerWins,
    dealerWins,
    score,
    restart,
}) =>
  <div className="b-table">
    <Modal isOpen={status === 'Win' || status === 'Lose'} onClick={newGame} score={score}>
      {__getStatus(status)}
    </Modal>

    <div style={{ display: 'flex'}}>
      <div style={{ flex: '1 1 auto'}}>
        <div className="submenu">
          <button
            className='language'
            onClick={()=> {
              __switchLanguage();
              quit();
            }}>
              {language.profile}
          </button>
        </div>
        <h1 className="title">Blackjack</h1>
        <div className="action">
          <button
            disabled={ drawPile && drawPile.length === 0 }
            className="deal"
            onClick={ deal }>
              {language.deal}
          </button>
        </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 12, background: 'rgba(255, 255, 255, 0.1)', marginBottom: 24, borderRadius: 4 }}>
              <span style={{ color: 'white'}}>{language.playerWins}: { playerWins }</span>
              <span style={{ color: 'white'}}>{language.dealerWins}: { dealerWins }</span>
            </div>
        { drawPile && drawPile.length === 0 &&
          <div style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '1 1 auto', color: 'white', fontSize: 50}}>{language.deckEmptyMsg} 
            <div style={{ display: 'flex', justifyContent: 'center', margin: 24 }} className="actions-btn"> 
              <button   onClick={newGame} >{language.restartGame}</button>
            </div>
          </div>
        }

          <div>
            <Hand
              label={language.dealerHand}
              cards={ dealerHand }
              score={status === statuses.PLAYING ? '?' : dealerScore}
            />
          </div>
          <div style={{ marginTop: '20px'}}>
            <Hand label={language.playerHand} cards={ playerHand } score={playerScore} />
          </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', margin: 24 }} className="actions-btn">
          <button
            disabled={dealerHand.length === 0 || status !== statuses.PLAYING || drawPile && drawPile.length === 0}
            onClick={() => hit('player')}>
              {language.hit}
          </button>

          <button
            disabled={dealerHand.length === 0 || status !== statuses.PLAYING || drawPile && drawPile.length === 0}
            onClick={ stand }>
              {language.stand}
          </button>

          <button
            disabled={dealerHand.length === 0 || status !== statuses.PLAYING || drawPile && drawPile.length === 0}
            onClick={ quit }>
              {language.quit}
          </button>
          <button
            disabled={dealerHand.length === 0 || status !== statuses.PLAYING || drawPile && drawPile.length === 0}
            onClick={ () => {
              restart();
              quit();
            } }>
              {language.restart}
          </button>
        </div>
      </div>
    </div>
  </div>;

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, actions)(BlackjackGame);