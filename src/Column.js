import React from 'react';
import {map, sortBy} from 'lodash';
import Card from './Card';
import {getPosition, Position} from './Utils';

function ColumnHeader(props) {
    const headerStyle = {backgroundColor: props.headerColor}
    const position = props.position;
    const hideButtons = position === Position.ONLY ? 'hidden' : '';
    const hideLeftButton = !(position === Position.MIDDLE) && 
            !(position === Position.LAST) ? 'hidden' : '';
    const hideRightButton = !(position === Position.MIDDLE) && 
            !(position === Position.FIRST) ? 'hidden' : '';
    return (
        <div className="column__header" style={headerStyle}>
            <i className={`fas fa-chevron-left card__up-button 
                ${hideButtons} ${hideLeftButton}`} onClick={props.handleMoveColumnLeft}></i>
            <span className="column__title text--white">{props.title}</span>
            <i className={`fas fa-chevron-right card__down-button 
                ${hideButtons} ${hideRightButton}`} onClick={props.handleMoveColumnRight}></i>
        </div>
    );
}

class Column extends React.Component {
    render () {
        const columnPosition = getPosition(this.props.columns.length, this.props.column.order)
        return (
            <div className="column" data-column-id={this.props.column.id} 
                data-column-order={this.props.column.order}>
              <ColumnHeader 
                title={this.props.column.title} 
                headerColor={this.props.column.headerColor}
                position={columnPosition}
                handleMoveColumnLeft={this.props.handleMoveColumnLeft}
                handleMoveColumnRight={this.props.handleMoveColumnRight}
              />
              <div className="column__cards">
                {
                  map(sortBy(this.props.column.cards, 'order'), (card, i) => {
                    return <Card
                            card={card}
                            key={i}
                            numberOfCardsInColumn={this.props.column.cards.length}
                            handleDeleteCardModalOpen={this.props.handleDeleteCardModalOpen}
                            handleAddCardModelClose={this.props.handleAddCardModelClose}
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
