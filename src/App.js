import { Component } from 'react';

import { CardList } from './components/card-list/card-list';
import { SearchBox } from './components/search-box/search-box';

import './App.css';

 class App extends Component {
  
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    }
    // This is verbose, just write the method as an arrow func and move on
    // this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    // weird es6 magic basically binds 'this' to the place our arrow func
    // was created, so in this case, 'this' refers to App.js aka our app component
    this.setState({ searchField: e.target.value });
  }

  componentDidMount() {
    // populate monsters state obj with json placeholder api on mount
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(users => this.setState({ monsters: users }));
  }

  render() {
    // my assumption is that we handle the below inside of the render function
    // because render() is called whenever state updates and we want to
    // automatically filter

    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(searchField.toLowerCase()));

    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox 
          placeholder='search monsters'
          handleChange={this.handleChange}

        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }

}

export default App;
