import React from 'react';
import './App.css';
import Column from './Column';
import {map, find} from 'lodash';

class App extends React.Component {

  defaultCards = [
    {
      order: 0,
      text: 'one two three'
    },
    {
      order: 1,
      text: 'four five six'
    },
    {
      order: 2,
      text: 'seven eight nine'
    },
    {
      order: 3,
      text: 'ten eleven twelve'
    },
  ];

  defaultState = {
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

  state = {};

  componentDidMount() {
    const localStorageState = localStorage.getItem('react-kanban-board-state');
    if (localStorageState) {
      this.setState(JSON.parse(localStorageState));
    } else {
      this.setState(this.defaultState);
      localStorage.setItem('react-kanban-board-state', JSON.stringify(this.defaultState));
    }
  }

  constructor() {
    super();
    
    this.addCard = this.addCard.bind(this);
  }

  addCard(e) {
    const columnId = Number(e.currentTarget.parentElement.getAttribute('data-column-id'));
    const state = Object.assign(this.state, {});
    const column = find(state.columns, {id: columnId});
    const text = prompt('Enter your text');
    if (!text) return;

    column.cards.push({
      order: 5,
      text: text
    });

    this.setState(state);
    localStorage.setItem('react-kanban-board-state', JSON.stringify(this.state));
  }

  render() {
    return (
      <div className="app">
        {
          map(this.state.columns, (column, i) => {
            return <Column 
              column={column}
              key={i} 
              addCard={this.addCard}
            />
          })
        }
      </div>
    );
  }
}

export default App;
