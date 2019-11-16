/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, or a 6 twice in row, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points (or a user assinged # of points) on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice, gamePlaying, assignedScore, roundScores;

/*Creating game initialization function */
function init() {
    scores = [0, 0];
    roundScore = 0;
    roundScores = [0, 0];
    activePlayer = 0;
    gamePlaying = true;
    assignedScore = 100;
    console.log('Scores = ' + scores);
    console.log('Round score = ' + roundScore);
    console.log('Assigned score = ' + assignedScore);
    
    document.getElementById('quantity').value = null;
    
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    document.querySelector('.player-0-panel').classList.add('active');
    
}

init();

/*Getting data from the score input field */
function getData() {
    //document.getElementById('myForm').submit();
    //document.getElementById('button').addEventListener('click', function() {
    data = document.getElementById('quantity').value;
    if (data == null || data > 100 ) {
        alert('Please, enter a value from 0 to 100.');
        document.getElementById('quantity').value = null;
    } else {
        assignedScore = data;
        console.log(assignedScore);
        document.getElementById('quantity').value = null;
        }
   // });

};


document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        //Generate random number
        dice = Math.floor(Math.random() * 6) + 1;
        roundScores.unshift(dice);
        if (roundScores.length > 2) {
            roundScores.pop(roundScores[2]);
            console.log(roundScores);
        } else {
            return(roundScores);
        };

        // Display the result
        var diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';
        
        //Update the round score if the rolled number wasn't 1
        if (roundScores[0] == 6 && roundScores[1] == 6) {
            roundScore = 0;
            scores[activePlayer] = 0;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            roundScores = [0, 0];
            nextPlayer();
        } else if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //Add current score to global score
        scores[activePlayer] += roundScore;
    
        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
        //Check if player's score > 100 (won the game)
        if (scores[activePlayer] >= assignedScore) {
            console.log(assignedScore);
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    //Next Player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    roundScores = [0, 0];
        
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
        
    //document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
        
    document.querySelector('.dice').style.display = 'none';
}

//Start New Game
document.querySelector('.btn-new').addEventListener('click', init);