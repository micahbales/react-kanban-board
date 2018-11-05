import React from 'react';
import './App.css';
import Column from './Column';
import {map} from 'lodash';

class App extends React.Component {

  defaultCards = [
    {
      id: 1,
      title: 'First',
      text: 'one two three'
    },
    {
      id: 2,
      title: 'Second',
      text: 'four five six'
    },
    {
      id: 3,
      title: 'Third',
      text: 'seven eight nine'
    },
    {
      id: 4,
      title: 'Fourth',
      text: 'ten eleven twelve'
    },
  ];

  state = {
    // This is default data that should be set if there's no state in local storage
    // If local storage has state for us, use that instead
    columns: [
      {
        id: 1,
        headerColor: '#8E6E95',
        cards: this.defaultCards,
        title: 'First Column'
      },
      {
        id: 2,
        headerColor: '#39A59C',
        cards: this.defaultCards,
        title: 'Second Column'
      },
      {
        id: 3,
        headerColor: '#344759',
        cards: this.defaultCards,
        title: 'Third Column'
      },
      {
        id: 4,
        headerColor: '#E8741E',
        cards: this.defaultCards,
        title: 'Fourth Column'
      },
    ]
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
          map(this.state.columns, (column, i) => {
            return <Column 
              title={column.title} 
              key={i} 
              headerColor={column.headerColor}
              cards={column.cards}
              addCard={this.addCard}
            />
          })
        }
      </div>
    );
  }
}

export default App;
