import React from 'react';
import {map, sortBy} from 'lodash';
import Card from './Card';

function ColumnHeader(props) {
    const headerStyle = {backgroundColor: props.headerColor}
    return (
        <div className="column__header" style={headerStyle}>
            <span className="column__title text--white">{props.title}</span>
        </div>
    );
}

class Column extends React.Component {
    render () {
        return (
            <div className="column" data-column-id={this.props.column.id}>
              <ColumnHeader className="column__header" title={this.props.column.title} headerColor={this.props.column.headerColor} />
              <div className="column__cards">
                {
                  map(sortBy(this.props.column.cards, 'order'), (card, i) => {
                    return <Card
                            card={card}
                            key={i}
                            handleDeleteCardModalOpen={this.props.handleDeleteCardModalOpen}
                            handleAddCardModelClose={this.props.handleAddCardModelClose}
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
