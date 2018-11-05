import React from 'react';
import './App.css';
import Column from './Column';

class App extends React.Component {

  state = {
    // This is default data that should be set if there's no state in local storage
    // If local storage has state for us, use that instead
    columnHeaderColors: ["#8E6E95", "#39A59C", "#344759", "#E8741E"],
    cardTitles: ["first", "second", "third", "fourth"],
    cardText: ["one two three", "four five six"]
  }

  constructor() {
    super();
    this.addCard = this.addCard.bind(this);
  }

  addCard() {
    const text = prompt('enter your text');
    const state = Object.assign(this.state, {});

    if (text) {
      // should be something like state.card[cardId].push(text)
      state.cardText.push(text);
      this.setState(state);
    }
  }

  render() {
    return (
      <div className="app">
        {
          this.state.cardTitles.map((title, i) => {
            return <Column 
              title={title} 
              key={i} 
              headerColor={this.state.columnHeaderColors[i]}
              cardText={this.state.cardText}
              addCard={this.addCard}
            />
          })
        }
      </div>
    );
  }
}

export default App;
