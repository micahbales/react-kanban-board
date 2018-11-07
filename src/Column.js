import React from 'react';
import {map, sortBy} from 'lodash';
import Card, {CardPosition} from './Card';

function ColumnHeader(props) {
    const headerStyle = {backgroundColor: props.headerColor}
    return (
        <div className="column__header" style={headerStyle}>
            <span className="column__title text--white">{props.title}</span>
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
            <div className="column" data-column-id={this.props.column.id}>
              <ColumnHeader className="column__header" title={this.props.column.title} headerColor={this.props.column.headerColor} />
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
