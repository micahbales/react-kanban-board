import React from 'react';
import {Position} from './Column';

function NavButtons(props) {
    const position = props.position;
    const hideButtons = position === Position.ONLY ? 'hidden' : '';
    const hideUpButton = !(position === Position.MIDDLE) && 
            !(position === Position.LAST) ? 'hidden' : '';
    const hideDownButton = !(position === Position.MIDDLE) && 
            !(position === Position.FIRST) ? 'hidden' : '';
    return (
        <div className={`card__nav-buttons ${hideButtons}`}>
            <i className={`fas fa-chevron-up card__up-button ${hideUpButton}`} onClick={props.handleMoveCardUp}></i>
            <i className={`fas fa-chevron-down card__down-button ${hideDownButton}`} onClick={props.handleMoveCardDown}></i>
        </div>
    );
}

class Card extends React.Component {
    getCardPosition(numberOfCardsInColumn, cardOrder) {
        const isFirstCard = cardOrder === 0;
        const isLastCard = cardOrder > 0 && cardOrder === numberOfCardsInColumn - 1; 
        if (isLastCard) {
            return Position.LAST;
        } else if (isFirstCard && numberOfCardsInColumn === 1) {
            return Position.ONLY_CARD;
        } else if (isFirstCard && numberOfCardsInColumn > 1) {
            return Position.FIRST;
        } else {
            return Position.MIDDLE;
        }
    }

    render() {
        const cardPosition = this.getCardPosition(this.props.numberOfCardsInColumn, this.props.card.order);
        return (
            <div className="card" data-card-order={this.props.card.order}>
                <div className="card__text">{this.props.card.text}</div>
                <div className="card__buttons">
                    <i className="fas fa-trash card__delete-button" onClick={this.props.handleDeleteCardModalOpen}></i>
                    <NavButtons 
                        position={cardPosition}
                        handleMoveCardUp={this.props.handleMoveCardUp}
                        handleMoveCardDown={this.props.handleMoveCardDown}
                    />
                </div>
            </div>
        );
    }
}

export default Card;
