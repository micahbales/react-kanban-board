import React from 'react';
import './App.css';
import Column from './Column';
import AddCardModal from './modals/AddCardModal';
import DeleteCardModal from './modals/DeleteCardModal';
import AddColumnModal from './modals/AddColumnModal';
import UpdateColumnModal from './modals/UpdateColumnModal';
import {map, filter, find, reduce, sortBy} from 'lodash';

const ColumnMoveDirection = {
    DEFAULT: 0,
    LEFT: 1,
    RIGHT: 2
}

const CardMoveDirection = {
    DEFAULT: 0,
    UP: 1,
    DOWN: 2
}

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
        order: 0,
        headerColor: '#8E6E95',
        cards: this.defaultCards,
        title: 'First Column'
      },
      // {
      //   id: 2,
      //   order: 1,
      //   headerColor: '#39A59C',
      //   cards: this.defaultCards,
      //   title: 'Second Column'
      // },
      // {
      //   id: 1,
      //   order: 2,
      //   headerColor: '#344759',
      //   cards: this.defaultCards,
      //   title: 'Third Column'
      // },
      // {
      //   id: 0,
      //   order: 3,
      //   headerColor: '#E8741E',
      //   cards: this.defaultCards,
      //   title: 'Fourth Column'
      // },
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
    },
    updateColumnState: {
      columnId: null,
      title: ''
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
    this.handleUpdateColumn = this.handleUpdateColumn.bind(this);
    this.handleUpdateColumnModalOpen = this.handleUpdateColumnModalOpen.bind(this);
    this.handleDeleteColumn = this.handleDeleteColumn.bind(this);
    this.handleMoveColumnLeft = this.handleMoveColumnLeft.bind(this);
    this.handleMoveColumnRight = this.handleMoveColumnRight.bind(this);
    this.getColumnState = this.getColumnState.bind(this);
    this.handleMoveCardUp = this.handleMoveCardUp.bind(this);
    this.handleMoveCardDown = this.handleMoveCardDown.bind(this);
    this.getCardState = this.getCardState.bind(this);
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
    state.addCardState.columnId = Number(e.currentTarget
          .parentElement.parentElement.parentElement.getAttribute('data-column-id'));
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
        .parentElement.parentElement.parentElement.parentElement
        .getAttribute('data-column-id'));
    const cardOrder = Number(e.currentTarget
        .parentElement.parentElement.getAttribute('data-card-order'));
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

    // Set id & order for new column
    const highestExistingId = reduce(state.columns, (num, column) => column.id >= num ? column.id : num, 0);
    const columnId = highestExistingId + 1;
    const highestExistingOrder = reduce(state.columns, (num, column) => column.order >= num ? column.order : num, 0);
    const columnOrder = highestExistingOrder + 1;

    // Add new card to state
    state.columns.push({
      id: columnId,
      order: columnOrder,
      title: title,
      headerColor: '#8E6E95',
      cards: []
    });

    this.updateStateAndLocalStorage(state);
    this.handleAddColumnModalClose();
  }

  handleUpdateColumn(e) {
    e.preventDefault();

    const state = Object.assign(this.state, {});
    const title = e.currentTarget.parentElement.querySelector('#title').value;
    if (!title) return;

    const column = state.columns.find((column) => column.id === state.updateColumnState.columnId);

    column.title = title;

    this.updateStateAndLocalStorage(state);
    this.handleUpdateColumnModalClose();
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

  handleDeleteColumn(e) {
    e.preventDefault();

    const state = Object.assign({}, this.state);
    const columnId = this.state.updateColumnState.columnId;

    state.columns = filter(state.columns, (column) => column.id !== columnId);
    
    this.updateStateAndLocalStorage(state);
    this.handleUpdateColumnModalClose();
  }

  handleUpdateColumnModalOpen(e) {
    const columnId = Number(e.currentTarget
          .parentElement.parentElement.parentElement.getAttribute('data-column-id'));
    const title = e.currentTarget.parentElement.parentElement.parentElement
        .querySelector('.column__header .column__title').innerText;
    const state = Object.assign({}, this.state);
    
    state.updateColumnState.columnId = columnId;
    state.updateColumnState.title = title;
    this.updateStateAndLocalStorage(state);
    
    document.querySelector('.modal.update-column-modal')
        .classList.remove('hidden');
  }

  handleUpdateColumnModalClose() {
    document.querySelector('.modal.update-column-modal')
        .classList.add('hidden');
  }

  getColumnState(e, direction) {
    const columnElement = e.currentTarget.parentElement.parentElement;
    const columnOrder = Number(columnElement.getAttribute('data-column-order'));
    const swapcolumnOrder = direction === ColumnMoveDirection.RIGHT ? columnOrder + 1 : columnOrder - 1;
    const state = Object.assign({}, this.state);
    
    const column = state.columns.find((column) => column.order === columnOrder);
    const swapColumn = state.columns.find((column) => column.order === swapcolumnOrder);

    return [column, swapColumn, state];
  }

  getCardState(e, direction) {
    const cardElement = e.currentTarget.parentElement.parentElement.parentElement;
    const cardOrder = Number(cardElement.getAttribute('data-card-order'));
    const swapCardOrder = direction === CardMoveDirection.DOWN ? cardOrder + 1 : cardOrder - 1;
    const columnId = Number(cardElement.parentElement.parentElement.getAttribute('data-column-id'));
    const state = Object.assign({}, this.state);
    const column = state.columns.find((column) => column.id === columnId);

    const card = column.cards.find((card) => card.order === cardOrder);
    const swapCard = column.cards.find((card) => card.order === swapCardOrder);

    return [card, swapCard, state];
  }

  handleMovement(e, direction, getItemState) {
    const [card, previousCard, state] = getItemState(e, direction);
    // Swap order of two cards
    let swap = card.order;
    card.order = previousCard.order;
    previousCard.order = swap;
    // Save to state
    this.updateStateAndLocalStorage(state);
  }

  handleMoveColumnLeft(e) {
    this.handleMovement(e, ColumnMoveDirection.LEFT, this.getColumnState);
  }

  handleMoveColumnRight(e) {
    this.handleMovement(e, ColumnMoveDirection.RIGHT, this.getColumnState);
  }

  handleMoveCardUp(e) {
    this.handleMovement(e, CardMoveDirection.UP, this.getCardState);
  }

  handleMoveCardDown(e) {
    this.handleMovement(e, CardMoveDirection.DOWN, this.getCardState);
  }

  render() {
    return (
      <div className='app'>
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
        <UpdateColumnModal
          title={this.state.updateColumnState.title}
          handleUpdateColumnModalClose={this.handleUpdateColumnModalClose}
          handleUpdateColumn={this.handleUpdateColumn}
          handleDeleteColumn={this.handleDeleteColumn}
        />
        <div className='columns'>
          {
            map(sortBy(this.state.columns, 'order'), (column, i) => {
              return <Column 
                column={column}
                columns={this.state.columns}
                key={i} 
                handleAddCardModalOpen={this.handleAddCardModalOpen}
                handleDeleteCardModalOpen={this.handleDeleteCardModalOpen}
                handleUpdateColumnModalOpen={this.handleUpdateColumnModalOpen}
                handleMoveColumnLeft={this.handleMoveColumnLeft}
                handleMoveColumnRight={this.handleMoveColumnRight}
                handleMoveCardUp={this.handleMoveCardUp}
                handleMoveCardDown={this.handleMoveCardDown}
              />
            })
          }
          <div className='column add-column' onClick={this.handleAddColumnModalOpen}>
            + Column
          </div>
        </div>
      </div>
    );
  }
}

export default App;
