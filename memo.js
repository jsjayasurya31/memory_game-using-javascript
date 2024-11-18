const cardArray = [
    // ... (your existing card array)
    {
        name:'JS',
        icon:'<i class="fa-brands fa-js"></i>'
    },
    {
        name:'heart',
        icon:'<i class="fa-solid fa-heart"></i>'
    },
    {
        name:'twitter',
        icon:'<i class="fa-brands fa-twitter"></i>'
    },
    {
        name:'earth',
        icon:'<i class="fa-solid fa-earth-americas"></i>'
    },
    {
        name:'react',
        icon:'<i class="fa-brands fa-react"></i>'
    },
    {
        name:'crown',
        icon:'<i class="fa-solid fa-crown"></i>'
    },
    {
        name:'JS',
        icon:'<i class="fa-brands fa-js"></i>'
    },
    {
        name:'heart',
        icon:'<i class="fa-solid fa-heart"></i>'
    },
    {
        name:'twitter',
        icon:'<i class="fa-brands fa-twitter"></i>'
    },
    {
        name:'earth',
        icon:'<i class="fa-solid fa-earth-americas"></i>'
    },
    {
        name:'react',
        icon:'<i class="fa-brands fa-react"></i>'
    },
    {
        name:'crown',
        icon:'<i class="fa-solid fa-crown"></i>'
    }
];

let flippedCard = [];
let matchedPairs = 0; // Count of matched pairs
let score = 0; // Initialize score
shuffleCards();
const gameboard = document.getElementById('gameboard');
const scoreDisplay = document.getElementById("scorecard");
displayCards();

function shuffleCards() {
    for( let i=cardArray.length-1;i>=0;i--){
        const randIndex = Math.floor(Math.random()*(i+1));
        [cardArray[i],cardArray[randIndex]] =  [cardArray[randIndex],cardArray[i]]
    }  
}

function displayCards() {
    cardArray.forEach((curr, index,arr) => {
        const card = document.createElement('div');
        card.setAttribute('id', index);
        card.classList.add('cardback', 'active');
        gameboard.append(card);
        card.addEventListener('click', flipCard);
    });
}

function flipCard() {
    if (flippedCard.length < 2 && this.classList.contains('active')) {
        let cardId = this.getAttribute('id');
        flippedCard.push(this);
        this.classList.remove('cardback');
        this.innerHTML = cardArray[cardId].icon;
        if (flippedCard.length == 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const card1Id = flippedCard[0].getAttribute('id');
    const card2Id = flippedCard[1].getAttribute('id');
    if (cardArray[card1Id].name === cardArray[card2Id].name) {
        flippedCard[0].style.border = 'none';
        flippedCard[0].style.backgroundColor = '#0B2F9F';
        flippedCard[0].innerHTML = '';
        flippedCard[0].classList.remove('active');
        flippedCard[1].style.border = 'none';
        flippedCard[1].style.backgroundColor = '#0B2F9F';
        flippedCard[1].innerHTML = '';
        flippedCard[1].classList.remove('active');
        
        matchedPairs++;
        score++; // Increase score
        scoreDisplay.innerHTML = `Score: ${score}`; // Update score display
        checkGameOver();
    } else {
        flippedCard[0].innerHTML = '';
        flippedCard[0].classList.add('cardback');
        flippedCard[1].innerHTML = '';
        flippedCard[1].classList.add('cardback');
    }
    flippedCard = [];
}
function checkGameOver() {
    if (matchedPairs === cardArray.length / 2) {
        // Check if the score is 6
        if (score === 6) {
            const alertMessage = document.getElementById('alert');
            alertMessage.classList.add('alert', 'alert-success', 'text-light');
            alertMessage.innerHTML = '<h1>You won...!<h1>'; // Alert message text
            gameboard.innerHTML = ''; // Clear the gameboard
            gameboard.classList.remove('game'); // Remove game class if needed
        }
    }
}
