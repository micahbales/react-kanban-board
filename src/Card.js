import React from 'react';

export const CardPosition = {
    DEFAULT: 0,
    ONLY_CARD: 1,
    FIRST: 2,
    MIDDLE: 3,
    LAST: 4
}

function NavButtons(props) {
    const position = props.cardPosition;
    const hideButtons = position === CardPosition.ONLY_CARD ? 'hidden' : '';
    const hideUpButton = !(position === CardPosition.MIDDLE) && 
            !(position === CardPosition.LAST) ? 'hidden' : '';
    const hideDownButton = !(position === CardPosition.MIDDLE) && 
            !(position === CardPosition.FIRST) ? 'hidden' : '';
    
    return (
        <div className={`card__nav-buttons ${hideButtons}`}>
            <i className={`fas fa-chevron-up ${hideUpButton}`}></i>
            <i className={`fas fa-chevron-down ${hideDownButton}`}></i>
        </div>
    );
}

class Card extends React.Component {
    render() {
        return (
            <div className="card" data-card-order={this.props.card.order}>
                <div className="card__text">{this.props.card.text}</div>
                <button className="card__delete-button" onClick={this.props.handleDeleteCardModalOpen}>DELETE</button>
                <NavButtons cardPosition={this.props.cardPosition} />
            </div>
        );
    }
}

export default Card;
