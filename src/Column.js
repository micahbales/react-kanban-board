import React from 'react';
import {map} from 'lodash';

function ColumnHeader(props) {
    const headerStyle = {backgroundColor: props.headerColor}
    return (
        <div className="column__header" style={headerStyle}>
            <span className="column__title text--white">{props.title}</span>
        </div>
    );
}


function Card(props) {
    return (
        <div className="card" data-card-id={props.card.id}>
            <div className="card__text">{props.card.text}</div>
        </div>
    );
}

class Column extends React.Component {

    render () {
        return (
            <div className="column">
              <ColumnHeader className="column__header" title={this.props.title} headerColor={this.props.headerColor} />
              <div className="column__cards">
                {
                  map(this.props.cards, (card, i) => {
                    return <Card card={card} key={i} />
                  })
                }
              </div>
              <div className="column__add-card-button" onClick={this.props.addCard}>
                + Add Card
              </div>
            </div>
          );
    }
}

export default Column;
