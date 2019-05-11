import React, { Component } from 'react';
import './App.css';

import { recipes } from './tempList';

import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';

export default class App extends Component {
  state = {
    error: '',
    query: '&q=',
    search: '',
    pageIndex: 1,
    details_id: 35389,
    recipes: recipes,
    base_url:
      'https://www.food2fork.com/api/search?key=a9acad6e5c14966634e43f25fd406e44',
    url:
      'https://www.food2fork.com/api/search?key=a9acad6e5c14966634e43f25fd406e44'
  };

  // lifecycle hook
  componentDidMount() {
    this.getRecipes();
  }

  async getRecipes() {
    try {
      const data = await fetch(this.state.url);
      const jsonData = await data.json();
      const { recipes } = jsonData;
      if (recipes === 0) {
        this.setState(() => {
          return {
            error: 'sorry but your search did not return any results'
          };
        });
      } else {
        this.setState(() => recipes);
      }
      this.setState({
        recipes: recipes
      });
    } catch (e) {
      console.log(e);
    }
  }

  handleIndex = (index) => {
    this.setState({
      pageIndex: index
    });
  };

  handleDetails = (index, id) => {
    this.setState({
      pageIndex: index,
      details_id: id
    });
  };

  displayPage = (index) => {
    switch (index) {
      default:
      case 1:
        return (
          <RecipeList
            recipes={this.state.recipes}
            handleDetails={this.handleDetails}
            value={this.state.search}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            error={this.state.error}
          />
        );
      case 0:
        return (
          <RecipeDetails
            id={this.state.details_id}
            handleIndex={this.handleIndex}
          />
        );
    }
  };

  handleChange = (e) => {
    this.setState(
      {
        search: e.target.value
      },
      () => {
        console.log(this.state.search);
      }
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { base_url, query, search } = this.state;
    this.setState(
      () => {
        return { url: `${base_url}${query}${search}`, search: '' };
      },
      () => {
        this.getRecipes();
      }
    );
  };

  render() {
    return (
      <React.Fragment>{this.displayPage(this.state.pageIndex)}</React.Fragment>
    );
  }
}
