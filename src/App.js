import React from 'react';
import './App.css';
import Column from './Column';
import AddCardModal from './modals/AddCardModal';
import UpdateCardModal from './modals/UpdateCardModal';
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
      text: 'example card'
    },
    {
      order: 1,
      text: 'to get you started'
    }
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
        title: 'Sample Column'
      }
    ]
  }

  state = {
    columns: [],
    colors: [
      {
        name: 'Purple',
        value: '#8E6E95'
      },
      {
        name: 'Turquoise',
        value: '#39A59C'
      },
      {
        name: 'Navy',
        value: '#344759'
      },
      {
        name: 'Orange',
        value: '#E8741E'
      }
    ],
    updateCardState: {
      columnId: null,
      cardOrder: null
    },
    updateColumnState: {
      columnId: null,
      columnOrder: null,
      headerColor: '',
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
    this.handleUpdateCard = this.handleUpdateCard.bind(this);
    this.handleDeleteCard = this.handleDeleteCard.bind(this);
    this.handleUpdateCardModalOpen = this.handleUpdateCardModalOpen.bind(this);
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

    const columnId = this.state.updateCardState.columnId;
    const state = Object.assign({}, this.state);
    const column = find(state.columns, {id: columnId});
    const text = e.currentTarget.parentElement.querySelector('#text').value;
    if (!text) return;

    // Set order for new card
    const newCardOrder = column.cards.length ? column.cards.length : 0;
    // Add new card to state
    column.cards.push({
      order: newCardOrder,
      text: text
    });

    this.updateStateAndLocalStorage(state);
    this.handleAddCardModalClose();
  }

  handleAddCardModalOpen(e) {
    const state = Object.assign({}, this.state);
    state.updateCardState.columnId = Number(e.currentTarget
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

  handleUpdateCard(e) {
    e.preventDefault();

    const state = Object.assign({}, this.state);
    const text = e.currentTarget.parentElement.querySelector('#text').value;
    if (!text) return;

    const {columnId, cardOrder} = this.state.updateCardState;
    const column = find(state.columns, {id: columnId});
    const card = filter(column.cards, (card) => card.order === cardOrder)[0];

    card.text = text;

    this.updateStateAndLocalStorage(state);
    this.handleUpdateCardModalClose();
  }

  handleDeleteCard(e) {
    e.preventDefault();

    const state = Object.assign({}, this.state);
    const {columnId, cardOrder} = this.state.updateCardState;
    const column = find(state.columns, {id: columnId});
    
    column.cards = map(
      // Filter out deleted card from state
      filter(column.cards, (card) => card.order !== cardOrder),
      // Update card order to account for missing card
      (card) => {
        card.order = card.order > cardOrder ? card.order - 1 : card.order;
        return card;
      }
    );
    
    this.updateStateAndLocalStorage(state);
    this.handleUpdateCardModalClose();
  }

  handleUpdateCardModalOpen(e) {
    const columnId = Number(e.currentTarget
        .parentElement.parentElement.parentElement.parentElement
        .getAttribute('data-column-id'));
    const cardOrder = Number(e.currentTarget
        .parentElement.parentElement.getAttribute('data-card-order'));
    const state = Object.assign({}, this.state);
    
    state.updateCardState.columnId = columnId;
    state.updateCardState.cardOrder = cardOrder;
    state.updateCardState.text = e.currentTarget
        .parentElement.parentElement.querySelector('.card__text').innerText
    
    this.updateStateAndLocalStorage(state);
    document.querySelector('.modal.update-card-modal')
        .classList.remove('hidden');
  }

  handleUpdateCardModalClose() {
    document.querySelector('.modal.update-card-modal')
        .classList.add('hidden');
  }

  handleAddColumn(e) {
    e.preventDefault();

    const state = Object.assign({}, this.state);
    const title = e.currentTarget.parentElement.querySelector('#title').value;
    if (!title) return;

    // Set id & order for new column
    const highestExistingId = reduce(state.columns, (num, column) => {
      return column.id >= num ? column.id : num;
    }, 0);
    const columnId = highestExistingId + 1;
    const highestExistingOrder = reduce(state.columns, (num, column) => {
      return column.order >= num ? column.order : num;
    }, 0);
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

    const state = Object.assign({}, this.state);
    const title = e.currentTarget.parentElement.querySelector('#title').value;
    const colorValue = e.currentTarget.parentElement.querySelector('#header-color-select').value;
    if (!title) return;

    const column = state.columns.find((column) => column.id === state.updateColumnState.columnId);

    column.title = title;
    column.headerColor = colorValue;
    state.updateColumnState.headerColor = colorValue;

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
    const columnOrder = this.state.updateColumnState.columnOrder;

    state.columns = map(
      // Filter out column to be deleted
      filter(state.columns, (column) => column.order !== columnOrder),
      // Update column order to account for missing column
      (column) => {
        column.order = column.order > columnOrder ? column.order - 1: column.order;
        return column;
      }
    );
    
    this.updateStateAndLocalStorage(state);
    this.handleUpdateColumnModalClose();
  }

  handleUpdateColumnModalOpen(e) {
    const columnOrder = Number(e.currentTarget
          .parentElement.parentElement.parentElement.getAttribute('data-column-order'));
    const title = e.currentTarget.parentElement.parentElement.parentElement
        .querySelector('.column__header .title').innerText;
    const state = Object.assign({}, this.state);
    const column = state.columns.find((column) => column.order === columnOrder);
    
    state.updateColumnState.columnOrder = columnOrder;
    state.updateColumnState.headerColor = column.headerColor;
    document.getElementById('header-color-select').value = column.headerColor;
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
    const swapColumnOrder = direction === ColumnMoveDirection.RIGHT ? columnOrder + 1 : columnOrder - 1;
    const state = Object.assign({}, this.state);
    
    const column = state.columns.find((column) => column.order === columnOrder);
    const swapColumn = state.columns.find((column) => column.order === swapColumnOrder);

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
    const [item, previousItem, state] = getItemState(e, direction);
    // Swap order of two items
    let swap = item.order;
    item.order = previousItem.order;
    previousItem.order = swap;
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
        <UpdateCardModal
          text={this.state.updateCardState.text}
          handleUpdateCardModalClose={this.handleUpdateCardModalClose}
          handleUpdateCard={this.handleUpdateCard}
          handleDeleteCard={this.handleDeleteCard}
        />
        <AddColumnModal 
          handleAddColumnModalClose={this.handleAddColumnModalClose}
          handleAddColumn={this.handleAddColumn}
        />
        <UpdateColumnModal
          title={this.state.updateColumnState.title}
          headerColor={this.state.updateColumnState.headerColor}
          colors={this.state.colors}
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
                handleUpdateCardModalOpen={this.handleUpdateCardModalOpen}
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
