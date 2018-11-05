import React from 'react';
import './App.css';
import Column from './Column';

class App extends React.Component {

  state = {
    columnHeaderColors: ["purple", "turqoise", "navy", "orange"],
    placeholderTitles: ["first", "second", "third", "fourth"],
    placeholderText: ["one two three", "four five six"]
  }

  constructor() {
    super();

    this.addCard = this.addCard.bind(this);
  }

  addCard() {
    const text = prompt('enter your text');
    const state = Object.assign(this.state, {});

    state.placeholderText.push(text);
    this.setState(state);
  }

  render() {
    return (
      <div className="app">
        {
          this.state.placeholderTitles.map((title, i) => {
            return <Column 
              title={title} 
              key={i} 
              headerColor={this.state.columnHeaderColors[i]}
              placeholderText={this.state.placeholderText}
              addCard={this.addCard}
            />
          })
        }
      </div>
    );
  }
}

export default App;
