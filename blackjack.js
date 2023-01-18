let deck = [];
let suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
let values = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];
let playerHand = [];
let dealerHand = [];
let playerPoints = 0;
let dealerPoints = 0;

document.getElementById("deal-button").addEventListener("click", function() {
  document.getElementById("hit-button").style.display = "inline-block";
  document.getElementById("stand-button").style.display = "inline-block";
  document.getElementById("deal-button").style.display = "none";
  shuffleDeck();
  dealCards();
});

for (let suit in suits) {
  for (let value in values) {
    let card = { Value: values[value], Suit: suits[suit] };
    deck.push(card);
  }
}


function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }
  shuffleDeck();


function dealCards() {
  playerHand = [deck.pop(), deck.pop()];
  dealerHand = [deck.pop(), deck.pop()];
  updateHand("player");
  
  let dealerCard = dealerHand[0];
  let dealerDiv = document.getElementById("dealer-hand");
  dealerDiv.innerHTML = "";
  let card = document.createElement("div");
  card.innerHTML = dealerCard.Value + " of " + dealerCard.Suit;
  dealerDiv.appendChild(card);
}


function updateHand(who) {
  let hand = who === "player" ? playerHand : dealerHand;
  let handDiv = document.getElementById(who + "-hand");
  handDiv.innerHTML = "";
  for (let i = 0; i < hand.length; i++) {
    let card = document.createElement("div");
    card.innerHTML = hand[i].Value + " of " + hand[i].Suit;
    handDiv.appendChild(card);
  }
}


function calculatePoints(hand) {
  let points = 0;
  let hasAce = false;
  for (let i = 0; i < hand.length; i++) {
    let cardValue = hand[i].Value;
    if (cardValue === "ace") {
      hasAce = true;
      points += 11;
    } else if (cardValue === "king" || cardValue === "queen" || cardValue === "jack") {
      points += 10;
    } else {
      points += cardValue;
    }
  }
  if (hasAce && points > 21) {
    points -= 10;
  }
  return points;
}


function resetGame(){
  location.reload();
}


document.getElementById("hit-button").addEventListener("click", function() {
  playerHand.push(deck.pop());
  updateHand("player");
  playerPoints = calculatePoints(playerHand);
  if (playerPoints > 21) {
    alert("You lose!");
    updateHand("dealer");
    resetGame()
  }
});
document.getElementById("stand-button").addEventListener("click", function() {
  updateHand("dealer");
  dealerPoints = calculatePoints(dealerHand);
  while (dealerPoints < 17) {
    dealerHand.push(deck.pop());
    updateHand("dealer");
    dealerPoints = calculatePoints(dealerHand);
  }
  if (dealerPoints > 21) {
    alert("You win!");
    resetGame()
  } else if (dealerPoints > playerPoints) {
    alert("You lose!");
    resetGame()
  } else if (dealerPoints < playerPoints) {
    alert("You win!");
    resetGame()
  } else {
    alert("It's a tie!");
    resetGame()
  }
});
document.getElementById("deal-button").addEventListener("click", function() {
  shuffleDeck();
  dealCards();
});
document.getElementById("reset-button").addEventListener("click", resetGame);