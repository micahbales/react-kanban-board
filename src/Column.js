import React from 'react';

function ColumnHeader(props) {
    return (
        <div className={`column-header ${props.headerColor}`}>
        <span className="column-title white">{props.title}</span>
        </div>
    );
    }


function Card(props) {
    return (
        <div className="card">
        <div className="card-text">{props.text}</div>
        </div>
    );
}

class Column extends React.Component {

    render () {
        return (
            <div className="column">
              <ColumnHeader className="column-header" title={this.props.title} headerColor={this.props.headerColor} />
              <div className="column-cards">
                {
                  this.props.placeholderText.map((text, i) => {
                    return <Card text={text} key={i} />
                  })
                }
              </div>
              <div className="add-card-button" onClick={this.props.addCard}>
                + Add Card
              </div>
            </div>
          );
    }
}

export default Column;
