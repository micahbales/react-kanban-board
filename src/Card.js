import React from 'react';
import {getPosition, Position} from './Utils';

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
    render() {
        const cardPosition = getPosition(this.props.numberOfCardsInColumn, this.props.card.order);
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
