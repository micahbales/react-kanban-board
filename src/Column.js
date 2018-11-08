import React from 'react';
import {map, sortBy} from 'lodash';
import Card from './Card';

export const Position = {
    DEFAULT: 0,
    ONLY: 1,
    FIRST: 2,
    MIDDLE: 3,
    LAST: 4
}

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
    getColumnPosition(numberOfColumns, ColumnOrder) {
        const isFirstColumn = ColumnOrder === 0;
        const isLastColumn = ColumnOrder > 0 && ColumnOrder === numberOfColumns - 1; 
        if (isLastColumn) {
            return Position.LAST;
        } else if (isFirstColumn && numberOfColumns === 1) {
            return Position.ONLY_Column;
        } else if (isFirstColumn && numberOfColumns > 1) {
            return Position.FIRST;
        } else {
            return Position.MIDDLE;
        }
    }

    render () {
        const columnPosition = this.getColumnPosition(this.props.columns.length, this.props.column.order)
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
