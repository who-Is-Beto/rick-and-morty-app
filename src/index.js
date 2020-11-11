import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import CharacterCard from './components/card'
const app = document.getElementById('app');

class App extends React.Component {
  state = {
    nextPage: 1,
    loading: true,
    error: null,
    data: {
      results: [],
    },
  }
  componentDidMount() {
    this.fetchCharacter()
  }

  fetchCharacter = async () => {
    this.setState({ loading: true, error: null })
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${this.state.nextPage}`)
      const data = await response.json()

      this.setState({
        loading: false,
        data: {
          info: data.info,
          results: [].concat(this.state.data.results, data.results)
        },
        nextPage: this.state.nextPage + 1,
      })
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      })
    }
  }
  render() {
    if (this.state.error) {
      return `Error: ${this.state.error.message}`
    }
    return (
      <div className="container">
        <div className="App">
          <h1>Rick and Morty Characters</h1>
          <ul>
            {this.state.data.results.map(character => (
              <li key={character.id}>
                <CharacterCard character={character} />
              </li>
            ))}
          </ul>

          {this.state.loading && (
            <div className="loader">
              <h1>Loading, please wait...</h1>
            </div>
          )}

          {!this.state.loading && (
            <button onClick={() => this.fetchCharacter()}>Load more!!!</button>
          )}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, app)

