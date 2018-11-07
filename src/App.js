import React from 'react';
import './App.css';
import Column from './Column';
import AddCardModal from './modals/AddCardModal';
import DeleteCardModal from './modals/DeleteCardModal';
import AddColumnModal from './modals/AddColumnModal';
import {map, filter, find, reduce} from 'lodash';

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
    ],
    addCardState: {
      columnId: null
    }
  }

  state = {
    columns: [],
    addCardState: {
      columnId: null
    },
    deleteCardState: {
      columnId: null,
      cardOrder: null
    }
  };

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
    this.handleAddCardModalOpen = this.handleAddCardModalOpen.bind(this);
    this.handleDeleteCard = this.handleDeleteCard.bind(this);
    this.handleDeleteCardModalOpen = this.handleDeleteCardModalOpen.bind(this);
    this.handleAddColumn = this.handleAddColumn.bind(this);
  }

  updateStateAndLocalStorage(state) {
    this.setState(state);
    localStorage.setItem('react-kanban-board-state', JSON.stringify(state));
  }

  handleAddCard(e) {
    e.preventDefault();

    const columnId = this.state.addCardState.columnId;
    const state = Object.assign(this.state, {});
    const column = find(state.columns, {id: columnId});
    const text = e.currentTarget.parentElement.querySelector('#text').value;
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
    this.handleAddCardModalClose();
  }

  handleAddCardModalOpen(e) {
    const state = Object.assign(this.state, {});
    state.addCardState.columnId = Number(e.currentTarget.parentElement.getAttribute('data-column-id'));
    this.setState(state);
    document.querySelector('.modal.add-card-modal')
        .classList.remove('hidden');
  }

  handleAddCardModalClose() {
    document.querySelector('.modal.add-card-modal')
        .classList.add('hidden');
    document.querySelectorAll('.add-card-modal input')
        .forEach((input) => {
          input.value = null;
        });
  }

  handleDeleteCard(e) {
    e.preventDefault();

    const state = Object.assign({}, this.state);
    const columnId = this.state.deleteCardState.columnId;
    const cardOrder = this.state.deleteCardState.cardOrder;
    const column = find(state.columns, {id: columnId});
    
    // Remove deleted card from state
    column.cards = filter(
      column.cards, 
      (card) => card.order !== cardOrder
    );
    
    this.updateStateAndLocalStorage(state);
    this.handleDeleteCardModalClose();
  }

  handleDeleteCardModalOpen(e) {
    const columnId = Number(e.currentTarget
      .parentElement.parentElement.parentElement
      .getAttribute('data-column-id'));
    const cardOrder = Number(e.currentTarget.parentElement.getAttribute('data-card-order'));
    const state = Object.assign({}, this.state);
    
    state.deleteCardState.columnId = columnId;
    state.deleteCardState.cardOrder = cardOrder;
    
    this.updateStateAndLocalStorage(state);
    document.querySelector('.modal.delete-card-modal')
        .classList.remove('hidden');
  }

  handleDeleteCardModalClose() {
    document.querySelector('.modal.delete-card-modal')
        .classList.add('hidden');
  }

  handleAddColumn(e) {
    e.preventDefault();

    const state = Object.assign(this.state, {});
    const title = e.currentTarget.parentElement.querySelector('#title').value;
    if (!title) return;

    // Set id for new column
    const highestExistingId = reduce(state.columns, (num, column) => column.id >= num ? column.id : num, 0);
    const columnId = highestExistingId + 1;

    // Add new card to state
    state.columns.push({
      id: columnId,
      title: title,
      headerColor: '#8E6E95',
      cards: []
    });

    this.updateStateAndLocalStorage(state);
    this.handleAddColumnModalClose();
  }

  handleAddColumnModalOpen() {
    document.querySelector('.modal.add-column-modal')
        .classList.remove('hidden');
  }

  handleAddColumnModalClose() {
    document.querySelector('.modal.add-column-modal')
        .classList.add('hidden');
    document.querySelectorAll('.add-column-modal input')
        .forEach((input) => {
          input.value = null;
        });
  }

  render() {
    return (
      <div className="app">
        <AddCardModal 
          handleAddCardModalClose={this.handleAddCardModalClose}
          handleAddCard={this.handleAddCard}
        />
        <DeleteCardModal 
          handleDeleteCardModalClose={this.handleDeleteCardModalClose}
          handleDeleteCard={this.handleDeleteCard}
        />
        <AddColumnModal 
          handleAddColumnModalClose={this.handleAddColumnModalClose}
          handleAddColumn={this.handleAddColumn}
        />
        {
          map(this.state.columns, (column, i) => {
            return <Column 
              column={column}
              key={i} 
              handleAddCardModalOpen={this.handleAddCardModalOpen}
              handleDeleteCardModalOpen={this.handleDeleteCardModalOpen}
            />
          })
        }
        <div className="column add-column" onClick={this.handleAddColumnModalOpen}>
          + Add Column
        </div>
      </div>
    );
  }
}

export default App;
