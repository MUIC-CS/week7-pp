import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class NameBox extends Component {
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.name}
          onChange={(e) => this.props.onNameChange(e.target.value)}
        />
      </div>
    )
  }
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

class NumberBox extends Component {
  onNumberChange(value) {
    if (isNumber(value)) {
      this.props.onNumberChange(value)
    }
  }

  render() {
    return (
      <div>
        <input
          type="number"
          value={this.props.value}
          onChange={(e) => this.onNumberChange(e.target.value).bind(this)}
        />
      </div>
    )
  }
}

class LeaderBoard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      scores: []
    }
  }

  refreshLeaderboard() {
    axios.get('/leaderboard').then((data) => {
      this.setState(data.scores)
    })
  }

  componentDidMount() {
    this.refreshLeaderboard()
  }

  render() {
    return (
      <div>
        <input type="button" onClick={() => this.refreshLeaderboard()} value="Refresh" />
        <table>
          {this.state.scores.map(x => {
            <tr>
              <td>{x.name}</td>
              <td>{x.score}</td>
            </tr>
          })}
        </table>
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: null,
      number: 1
    }
  }

  onNameChange(name) {
    this.setState({ name })
  }

  onNumberChange(number) {
    this.setState({ number })
  }

  onNumberSend() {
    axios.post('/guess').then(() => {
      console.log('guessssssss')
    })
  }

  render() {
    const { name, number } = this.state

    return (
      <div className="App">
        {name === null &&
        <NameBox name={name} onNameChange={this.onNameChange.bind(this)} />}
        {name !== null &&
        <div>
          <h2>Hello {name}</h2>
          <NumberBox value={number} onNumberChange={this.onNumberChange.bind(this)} />
          <button onClick={this.onNumberSend.bind(this)}>Guess</button>
          <LeaderBoard/>
        </div>
        }
      </div>
    );
  }
}

export default App;
