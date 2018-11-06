import React from 'react';

class Card extends React.Component {
    render() {
        return (
            <div className="card" data-card-order={this.props.card.order}>
                <div className="card__text">{this.props.card.text}</div>
                <button className="card__delete-button" onClick={this.props.handleDeleteCardModalOpen}>DELETE</button>
            </div>
        );
    }
}

export default Card;
