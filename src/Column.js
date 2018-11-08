import React from 'react';
import {map, sortBy} from 'lodash';
import Card, {CardPosition} from './Card';

function ColumnHeader(props) {
    const headerStyle = {backgroundColor: props.headerColor}
    const hideLeftButton = false;
    const hideRightButton = false;
    return (
        <div className="column__header" style={headerStyle}>
            <i className={`fas fa-chevron-left card__up-button ${hideLeftButton}`} onClick={props.handleMoveColumnLeft}></i>
            <span className="column__title text--white">{props.title}</span>
            <i className={`fas fa-chevron-right card__down-button ${hideRightButton}`} onClick={props.handleMoveColumnRight}></i>
        </div>
    );
}

class Column extends React.Component {

    getCardPosition(numberOfCardsInColumn, i) {
        const isFirstCard = i === 0;
        const isLastCard = i > 0 && i === numberOfCardsInColumn - 1; 
        if (isLastCard) {
            return CardPosition.LAST;
        } else if (isFirstCard && numberOfCardsInColumn === 1) {
            return CardPosition.ONLY_CARD;
        } else if (isFirstCard && numberOfCardsInColumn > 1) {
            return CardPosition.FIRST;
        } else {
            return CardPosition.MIDDLE;
        }
    }

    render () {
        return (
            <div className="column" data-column-id={this.props.column.id} 
                data-column-order={this.props.column.order}>
              <ColumnHeader 
                title={this.props.column.title} 
                headerColor={this.props.column.headerColor}
                handleMoveColumnLeft={this.props.handleMoveColumnLeft}
                handleMoveColumnRight={this.props.handleMoveColumnRight}
              />
              <div className="column__cards">
                {
                  map(sortBy(this.props.column.cards, 'order'), (card, i) => {
                    const cardPosition = this.getCardPosition(this.props.column.cards.length, i);

                    return <Card
                            card={card}
                            key={i}
                            handleDeleteCardModalOpen={this.props.handleDeleteCardModalOpen}
                            handleAddCardModelClose={this.props.handleAddCardModelClose}
                            cardPosition={cardPosition}
                            handleMoveCardUp={this.props.handleMoveCardUp}
                            handleMoveCardDown={this.props.handleMoveCardDown}
                        />
                  })
                }
              </div>
              <div className="column__add-card-button" onClick={this.props.handleAddCardModalOpen}>
                + add card
              </div>
              <div className="column__delete-column-button" onClick={this.props.handleDeleteColumnModalOpen}>
                - delete column
              </div>
            </div>
          );
    }
}

export default Column;
