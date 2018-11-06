import React from 'react';
import './App.css';
import Column from './Column';
import {map, filter, find} from 'lodash';

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
        id: 3,
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
        id: 1,
        headerColor: '#344759',
        cards: this.defaultCards,
        title: 'Third Column'
      },
      {
        id: 0,
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
      this.updateStateAndLocalStorage(this.defaultState);
    }
  }

  constructor() {
    super();
    this.handleAddCard = this.handleAddCard.bind(this);
    this.handleDeleteCard = this.handleDeleteCard.bind(this);
  }

  updateStateAndLocalStorage(state) {
    this.setState(state);
    localStorage.setItem('react-kanban-board-state', JSON.stringify(this.state));
  }

  handleAddCard(e) {
    const columnId = Number(e.currentTarget.parentElement.getAttribute('data-column-id'));
    const state = Object.assign(this.state, {});
    const column = find(state.columns, {id: columnId});
    const text = prompt('Enter your text');
    if (!text) return;

    // Set order for new card
    const lastCard = column.cards[column.cards.length - 1];
    const newCardOrder = lastCard ? lastCard.order + 1 : 0;
    // Add new card to state
    column.cards.push({
      order: newCardOrder,
      text: text
    });

    this.updateStateAndLocalStorage(state);
  }

  handleDeleteCard(e) {
    const columnId = Number(e.currentTarget
      .parentElement.parentElement.parentElement
      .getAttribute('data-column-id'));
    const cardOrder = Number(e.currentTarget.parentElement.getAttribute('data-card-order'));
    const state = Object.assign({}, this.state);
    const column = find(state.columns, {id: columnId});
    
    // Remove deleted card from state
    column.cards = filter(
      column.cards, 
      (card) => card.order !== cardOrder
    );
    
    this.updateStateAndLocalStorage(state);
  }

  render() {
    return (
      <div className="app">
        {
          map(this.state.columns, (column, i) => {
            return <Column 
              column={column}
              key={i} 
              handleAddCard={this.handleAddCard}
              handleDeleteCard={this.handleDeleteCard}
            />
          })
        }
      </div>
    );
  }
}

export default App;
