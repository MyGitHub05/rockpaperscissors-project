document.querySelector('.js-rock-button').addEventListener('click',() =>{
  playGame('rock');
});
document.querySelector('.js-paper-button').addEventListener('click',() =>{
  playGame('paper');
});
document.querySelector('.js-scissors-button').addEventListener('click',() =>{
  playGame('scissors');
});
document.querySelector('.js-reset-button').addEventListener('click',() => {

  localStorage.removeItem(score);
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.setItem('score', JSON.stringify(score));
  renderScore();
});
document.querySelector('.js-auto-play-button').addEventListener('click',() => {
  autoPlay();
});


let autoPlayingIsOn = false;
let intervalId;


function autoPlay(){
  if(!autoPlayingIsOn){
    intervalId = setInterval(function() {
      let playerMove = randomMove();
      playGame(playerMove);
    },1000);
    autoPlayingIsOn = true;
  }
  else {
    clearInterval(intervalId);
    autoPlayingIsOn = false;
  }

};


const score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

function playGame(playerMove){
  let computerMove = randomMove();
  let result = '';
  if(playerMove === 'rock'){
    if(computerMove === 'rock') result = 'tie';
    else if(computerMove === 'paper') result = 'lose';
    else if(computerMove === 'scissors') result = 'win';
  }
  if(playerMove === 'paper'){
    if(computerMove === 'rock') result = 'win';
    else if(computerMove === 'paper') result = 'tie';
    else if(computerMove === 'scissors') result = 'lose';
  }
  if(playerMove === 'scissors'){
    if(computerMove === 'rock') result = 'lose';
    else if(computerMove === 'paper') result = 'win';
    else if(computerMove === 'scissors') result = 'tie';
  }
  if(result === 'win') score.wins++;
  else if(result === 'lose') score.losses++;
  else if(result === 'tie') score.ties++;

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-player-move').innerHTML = `<img src="img/${playerMove}-emoji.png">`;
  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-computer-move').innerHTML = `<img src="img/${computerMove}-emoji.png">`;


  renderScore();
  

  localStorage.setItem('score', JSON.stringify(score));
};

renderScore();

function renderScore(){
    document.querySelector('.js-wins').innerHTML = score.wins;
    document.querySelector('.js-losses').innerHTML = score.losses;
    document.querySelector('.js-ties').innerHTML = score.ties;
}


function randomMove(){
  let randomNum = Math.random();

  if(randomNum >0 && randomNum < 1/3) return 'rock';
  else if(randomNum >1/3 && randomNum < 2/3) return 'paper';
  if(randomNum >2/3 && randomNum < 1) return 'scissors';
};



