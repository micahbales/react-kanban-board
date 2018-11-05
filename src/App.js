import React, { Component } from 'react';
import './App.css';


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


function Column(props) {
    return (
      <div className="column">
        <ColumnHeader className="column-header" title={props.title} headerColor={props.headerColor} />
        <div className="column-cards">
          {
            props.placeholderText.map((text, i) => {
              return <Card text={text} key={i} />
            })
          }
        </div>
        <div className="add-card-button" onClick={props.addCard}>
          + Add Card
        </div>
      </div>
    );
}

class App extends Component {

  state = {
    columnHeaderColors: ["purple", "turqoise", "navy", "orange"],
    placeholderTitles: ["first", "second", "third", "fourth"],
    placeholderText: ["one two three", "four five six"]
  }

  constructor() {
    super();

    this.addCard = this.addCard.bind(this);
  }

  addCard() {
    const text = prompt('enter your text');
    const state = Object.assign(this.state, {});

    state.placeholderText.push(text);
    this.setState(state);
  }

  render() {
    return (
      <div className="App">
        {
          this.state.placeholderTitles.map((title, i) => {
            return <Column 
              title={title} 
              key={i} 
              headerColor={this.state.columnHeaderColors[i]}
              placeholderText={this.state.placeholderText}
              addCard={this.addCard}
            />
          })
        }
      </div>
    );
  }
}

export default App;
