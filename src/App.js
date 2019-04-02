import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';
import Recipes from './components/Recipes';

const API_KEY = "584295bfc64a02b6b55ba68b13218c1d";
// const URL = "https://www.food2fork.com/api/get?key=YOUR_API_KEY&rId=35382";

class App extends Component {
  state = {
    recipes: []
  }

  getRecipe = async (e) => {
    e.preventDefault();
    const recipeName = e.target.elements.recipeName.value;

    // const api_call = await fetch(`https://www.food2fork.com/api/get?key=${API_KEY}&rId=35382`);
    const api_call = await fetch(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&count=10`);
    // console.log(recipeName);
    const data = await api_call.json();
    // console.log(data.recipes[4].recipe_id);
    // this.setState({ recipes: data });
    this.setState({ recipes: data.recipes });
    console.log(this.state.recipes);
  }
  componentDidMount = () => {
      const json = localStorage.getItem("recipes");
      const recipes = JSON.parse(json);
      this.setState({ recipes });
    }
    componentDidUpdate = () => {
      const recipes = JSON.stringify(this.state.recipes);
      localStorage.setItem("recipes", recipes);
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Find Recipes Around the World!</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
        <Recipes recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;
