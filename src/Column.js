import React from 'react';
import {map, sortBy} from 'lodash';
import Card from './Card';
import {getPosition, Position} from './Utils';

function ColumnHeader(props) {
    const headerStyle = {backgroundColor: props.headerColor}
    const position = props.position;
    const hideButtons = position === Position.ONLY ? 'invisible' : '';
    const hideLeftButton = !(position === Position.MIDDLE) && 
            !(position === Position.LAST) ? 'invisible' : '';
    const hideRightButton = !(position === Position.MIDDLE) && 
            !(position === Position.FIRST) ? 'invisible' : '';
    return (
        <div className='column__header' style={headerStyle}>
            <i className={`fas fa-chevron-left left-button 
                ${hideButtons} ${hideLeftButton}`} onClick={props.handleMoveColumnLeft}></i>
            <h3 className='title text--white'>{props.title}</h3>
            <i className={`fas fa-chevron-right right-button 
                ${hideButtons} ${hideRightButton}`} onClick={props.handleMoveColumnRight}></i>
        </div>
    );
}

class Column extends React.Component {
    render () {
        const columnPosition = getPosition(this.props.columns.length, this.props.column.order)
        return (
            <div className='column' data-column-id={this.props.column.id} 
                data-column-order={this.props.column.order}>
              <ColumnHeader 
                title={this.props.column.title} 
                headerColor={this.props.column.headerColor}
                position={columnPosition}
                handleMoveColumnLeft={this.props.handleMoveColumnLeft}
                handleMoveColumnRight={this.props.handleMoveColumnRight}
              />
              <div className='column__cards'>
                {
                  map(sortBy(this.props.column.cards, 'order'), (card, i) => {
                    return <Card
                            card={card}
                            key={i}
                            numberOfCardsInColumn={this.props.column.cards.length}
                            handleUpdateCardModalOpen={this.props.handleUpdateCardModalOpen}
                            handleAddCardModelClose={this.props.handleAddCardModelClose}
                            handleMoveCardUp={this.props.handleMoveCardUp}
                            handleMoveCardDown={this.props.handleMoveCardDown}
                        />
                  })
                }
              </div>
              <div className='column__buttons'>
                <div className='column__add-card-button'>
                    <i className='fas fa-plus-square' 
                            onClick={this.props.handleAddCardModalOpen}></i>
                </div>
                <div className='column__update-column-button'>
                    <i className='fas fa-pencil-alt' 
                            onClick={this.props.handleUpdateColumnModalOpen}></i>
                </div>
              </div>
            </div>
          );
    }
}

export default Column;
