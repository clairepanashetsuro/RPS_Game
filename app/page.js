'use client';

import { useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import './globals.css';

const choices = ['✊ Rock', '✋ Paper', '✌️ Scissors'];

export default function Home() {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [roundDetails, setRoundDetails] = useState({
    playerChoice: '',
    computerChoice: '',
    roundResult: 'Make your move to start the battle!'
  });

  let wonBy = undefined;
  if (playerScore === 5) wonBy = 'Player';
  if (computerScore === 5) wonBy = 'Computer';

  function play(playerChoice) {
    if (wonBy || isPlaying) return;

    setIsPlaying(true);
    setRoundDetails({
      playerChoice: 'Thinking...',
      computerChoice: 'Thinking...',
      roundResult: 'Both players are choosing...'
    });

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * 3);
      const computerChoice = choices[randomIndex];

      let resultText = "";
      let newPlayerScore = playerScore;
      let newComputerScore = computerScore;

      if (playerChoice === computerChoice) {
        resultText = "It's a tie";
      } else if (
        (playerChoice === '✊ Rock' && computerChoice === '✌️ Scissors') ||
        (playerChoice === '✋ Paper' && computerChoice === '✊ Rock') ||
        (playerChoice === '✌️ Scissors' && computerChoice === '✋ Paper')
      ) {
        resultText = "You win this round Makorokoto ";
        newPlayerScore += 1;
        setPlayerScore(newPlayerScore);
      } else {
        resultText = "Computer wins this round ";
        newComputerScore += 1;
        setComputerScore(newComputerScore);
      }

      setRoundDetails({
        playerChoice,
        computerChoice,
        roundResult: resultText
      });

      setIsPlaying(false);
    }, 600);
  }

  function startOver() {
    setPlayerScore(0);
    setComputerScore(0);
    setRoundDetails({
      playerChoice: '',
      computerChoice: '',
      roundResult: 'Make your move to start the battle!'
    });
    setIsPlaying(false);
  }

  return (
    <div className='container'>
      {wonBy === 'Player' && <ConfettiExplosion />}
      
      <h1>Rock, Paper, Scissors Shoot</h1>
      <p style={{ color: 'aliceblue' }}><strong>First to 5 points wins the match 🏆</strong></p>

      <div className='grid'>
        {choices.map((choice) => (
          <button 
            key={choice} 
            onClick={() => play(choice)}
            disabled={!!wonBy || isPlaying}
            style={{ fontSize: '1.5rem', padding: '15px 25px', cursor: 'pointer', borderRadius: '12px' }}
          >
            {choice}
          </button>
        ))}
      </div>

      <RoundInfo roundDetails={roundDetails} />
      
      <ScoreBoard playerScore={playerScore} computerScore={computerScore} />

      <GameOver onStartOver={startOver} wonBy={wonBy} />
    </div>
  );
}

function RoundInfo({ roundDetails }) {
  const { playerChoice, computerChoice, roundResult } = roundDetails;
  
  if (!playerChoice) {
    return <div style={{ margin: '20px 0', fontSize: '1.2rem', fontWeight: 'bold' }}>{roundResult}</div>;
  }

  return (
    <div style={{ margin: '20px 0', fontSize: '1.2rem', lineHeight: '1.6', textAlign: 'center' }}>
      You chose: <strong>{playerChoice}</strong> <br />
      Computer chose: <strong>{computerChoice}</strong> <br />
      <span style={{ fontWeight: 'bold', display: 'inline-block', marginTop: '10px' }}>{roundResult}</span>
    </div>
  );
}

function ScoreBoard({ playerScore, computerScore }) {
  return (
    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '15px 0' }}>
      Player: {playerScore} | Computer: {computerScore}
    </div>
  );
}

function GameOver({ onStartOver, wonBy }) {
  return (
    <div className={`game-over ${!wonBy ? 'hidden' : ''}`}>
      <h3 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '10px' }}>MATCH OVER!</h3>
      <h5 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '20px' }}>
        {wonBy === 'Player' ? ' You are the Champion! ' : 'The Computer is the champion of this round! '}
      </h5>
      <button 
        onClick={onStartOver}
        style={{ fontSize: '1.2rem', padding: '10px 20px', cursor: 'pointer', borderRadius: '8px' }}
      >
        START OVER
      </button>
    </div>
  );
}
