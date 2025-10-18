import { useState } from 'react';
import './styles.css';


function App() {
  // State to track which view to show
  const [currentView, setCurrentView] = useState('menu'); // 'menu', 'numberTrick', 'cardTrick'

  // Menu component
  const Menu = () => (
    <div className="magic-app">
      <div className="app-header">
        <h1>🎩 Magic Trick Collection</h1>
        <p>Choose your magic trick below</p>
      </div>
      
      <div className="trick-selection">
        <div className="trick-option" onClick={() => setCurrentView('numberTrick')}>
          <h3>🔢 Is This Your Number?</h3>
          <p>Ask questions to reveal their secret number</p>
        </div>
        
        <div className="trick-option" onClick={() => setCurrentView('cardTrick')}>
          <h3>🃏 Is This Your Card?</h3>
          <p>Classic card trick with a magical twist</p>
        </div>
      </div>
      
      <div className="app-footer">
        <p></p>
      </div>
    </div>
  );

  // Number Trick component
  const NumberTrick = () => {
    const [categories, setCategories] = useState(Array(5).fill(''));
    const [favorites, setFavorites] = useState(Array(5).fill(''));
    const [questionsList, setQuestionsList] = useState([]);
    const [answer, setAnswer] = useState('');

    const handleCategoryChange = (index, value) => {
      const newCategories = [...categories];
      newCategories[index] = value;
      setCategories(newCategories);
    };

    const handleFavoriteChange = (index, value) => {
      const newFavorites = [...favorites];
      newFavorites[index] = value;
      setFavorites(newFavorites);
    };

    const handleMagicTrick = () => {
      // Get the Category inputs directly from the categories array
      let questions = categories.filter(q => q.trim() !== '');
      let ans = [...questions];
      
      if (questions.length < 5) {
        setAnswer('Please fill in at least 5 categories! ✨');
        return;
      }
      
      let answerCode = []
      const numbers_key = [...questions].sort()

      let first_s = numbers_key.indexOf(questions[0])
      let curr_OG = 0
      let magic_number = first_s * 20
      answerCode.push(first_s)
      numbers_key.splice(first_s, 1)
      questions.splice(curr_OG, 1)
      

      const second_s = numbers_key.indexOf(questions[0])
      answerCode.push(second_s)
      numbers_key.splice(second_s, 1)
      questions.splice(0, 1)
      magic_number += second_s * 5

      const third_s = numbers_key.indexOf(questions[0])
      answerCode.push(third_s)
      numbers_key.splice(third_s, 1)
      questions.splice(0, 1)

      const fourth_s = numbers_key.indexOf(questions[0])
      answerCode.push(fourth_s)
      numbers_key.splice(fourth_s, 1)
      questions.splice(0, 1)

      if (third_s == 2) {
        magic_number += 5
      } else if (third_s == 0) {
        magic_number += (fourth_s + 1)
      } else if (third_s == 1){
        magic_number += (2 + fourth_s + 1)
      }
      setAnswer(`Your number is ${magic_number}!`);
      // setAnswer(`Your number is ${ans} ! ✨`);

    };

    return (
      <div className="magic-app">
        <div className="app-header">
          <h1>Let Me Read Your Mind</h1>
          <p>Your taste will tell me everything</p>
          <button className="back-button" onClick={() => setCurrentView('menu')}>
            ←
          </button>
        </div>
        
        <div className="text-fields-container">
          <div className="columns-container">
            <div className="column-section">
              <h3 className="column-label">Category</h3>
              <div className="text-column">
                  {[0, 1, 2, 3, 4].map(index => (
                    <input
                      key={index}
                      type="text"
                      className="magic-text-field"
                      value={categories[index]}
                      onChange={(e) => handleCategoryChange(index, e.target.value)}
                    />
                  ))}
              </div>
            </div>
            
            <div className="column-section">
              <h3 className="column-label">Favorite</h3>
              <div className="text-column favorite-column">
                  {[0, 1, 2, 3, 4].map(index => (
                    <input
                      key={index}
                      type="text"
                      className="magic-text-field favorite-field"
                      value={favorites[index]}
                      onChange={(e) => handleFavoriteChange(index, e.target.value)}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="magic-button-container">
          <button className="magic-button" onClick={handleMagicTrick}>
            Go ahead, read my mind
          </button>
        </div>
        
        {answer && (
          <div className="answer-display">
            <h3>Based on your answers:</h3>
            <p className="answer-text">{answer}</p>
          </div>
        )}
        
        <div className="app-footer">
          {/* <p>✨ Ready for your magic performance! ✨</p> */}
        </div>
      </div>
    );
  };

  // Card Trick component
  const CardTrick = () => {
    const [selectedCards, setSelectedCards] = useState(Array(5).fill(''));
    const [answer, setAnswer] = useState('');

    // Generate all 52 playing cards
    const suits = ['♣', '♥', '♠', '♦'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let cards_key = []
    for (const suit of suits){
      for (const rank of ranks){
        let entry = rank + suit
        cards_key.push(entry)
      }
    }


    const allCards = [];
    
    suits.forEach(suit => {
      ranks.forEach(rank => {
        allCards.push({
          value: `${rank}${suit}`,
          display: `${rank}${suit}`,
          suit: suit
        });
      });
    });
    


    const handleCardChange = (index, value) => {
      const newSelectedCards = [...selectedCards];
      newSelectedCards[index] = value;
      setSelectedCards(newSelectedCards);
    };

    const handleCardTrick = () => {
      const filledCards = selectedCards.filter(card => card.trim() !== '');
      if (filledCards.length < 5) {
        setAnswer('Please select all 5 cards!');
        return;
      }
      
      let cards = [...filledCards]
      let cards_sorted = []
      for (let card of cards) {
        cards_sorted.push(cards_key.indexOf(card))
      }
      cards_sorted = cards_sorted.sort((a, b) => a - b)


      // grab card ids
      let first_card = cards_key.indexOf(cards[0])
      let first_cards_id = cards_sorted.indexOf(first_card)
      cards.splice(0, 1)
      cards_sorted.splice(first_cards_id, 1)

      let second_card = cards_key.indexOf(cards[0])
      let second_cards_id = cards_sorted.indexOf(second_card)
      cards.splice(0, 1)
      cards_sorted.splice(second_cards_id, 1) 

      let third_card = cards_key.indexOf(cards[0])
      let third_cards_id = cards_sorted.indexOf(third_card)
      cards.splice(0, 1)
      cards_sorted.splice(third_cards_id, 1)

      let fourth_card = cards_key.indexOf(cards[0])
      let fourth_cards_id = cards_sorted.indexOf(fourth_card)
      cards.splice(0, 1)
      cards_sorted.splice(fourth_cards_id, 1)

      // Magic
      let magic_card_id = 13 * first_cards_id 
      
      if (second_cards_id == 3){
        magic_card_id += 12
      } else {
        magic_card_id += 4 * (second_cards_id) 
        magic_card_id += 2 * (third_cards_id)
        magic_card_id += fourth_cards_id
      }
      let your_card = cards_key[magic_card_id]
      setAnswer(`${your_card}`);
    };

    const getCardColor = (suit) => {
      return suit === '♥' || suit === '♦' ? 'red' : 'black';
    };

    return (
      <div className="magic-app">
        <div className="app-header">
          <h1>🃏 Is This Your Card?</h1>
          <p>Select 5 cards from the deck below</p>
          <button className="back-button" onClick={() => setCurrentView('menu')}>
            ←
          </button>
        </div>
        
        <div className="card-selection-container">
          <h3 className="card-selection-label">Select Your Cards</h3>
          <div className="card-row">
            {[0, 1, 2, 3, 4].map(index => (
              <div key={index} className="card-selection-item">
                <div className="custom-dropdown">
                  <div 
                    className="dropdown-trigger"
                    onClick={() => {
                      const dropdown = document.getElementById(`dropdown-${index}`);
                      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                    }}
                  >
                    {selectedCards[index] ? (
                      <span className={`selected-card ${getCardColor(selectedCards[index].slice(-1))}`}>
                        {selectedCards[index]}
                      </span>
                    ) : (
                      <span className="placeholder"></span>
                    )}
                    <span className="dropdown-arrow">▼</span>
                  </div>
                  <div id={`dropdown-${index}`} className="dropdown-menu">
                    {allCards.map((card, cardIndex) => (
                      <div
                        key={cardIndex}
                        className={`dropdown-option ${getCardColor(card.suit)}`}
                        onClick={() => {
                          handleCardChange(index, card.value);
                          document.getElementById(`dropdown-${index}`).style.display = 'none';
                        }}
                      >
                        {card.display}
                      </div>
                    ))}
                  </div>
                </div>
                {selectedCards[index] && (
                  <div className={`card-display ${getCardColor(selectedCards[index].slice(-1))}`}>
                    <div className="card-content">
                      <div className="card-rank">{selectedCards[index].slice(0, -1)}</div>
                      <div className="card-suit">{selectedCards[index].slice(-1)}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="magic-button-container">
          <button className="magic-button" onClick={handleCardTrick}>
            Hmm... let me think
          </button>
        </div>
        
        {answer && (
          <div className="answer-display">
            {answer === 'Please select all 5 cards!' ? (<p className="answer-text">{answer}</p>
            ) : (
              <>
                <h3>The card you're thinking of is:</h3>
                <div className="card-trick-result">
                  <div className={`card-display ${getCardColor(answer.slice(-1))}`}>
                    <div className="card-content">
                      <div className="card-rank">{answer.slice(0, -1)}</div>
                      <div className="card-suit">{answer.slice(-1)}</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
        
        <div className="app-footer">
          {/* <p>✨ Ready for your card magic performance! ✨</p> */}
        </div>
      </div>
    );
  };

  // Render different views based on currentView state
  if (currentView === 'menu') {
    return <Menu />;
  } else if (currentView === 'numberTrick') {
    return <NumberTrick />;
  } else if (currentView === 'cardTrick') {
    return <CardTrick />;
  }
}

export default App;
