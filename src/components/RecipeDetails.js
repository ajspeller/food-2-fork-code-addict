import React, { Component } from 'react';
import { recipe } from '../tempDetails';

export default class RecipeDetails extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     recipe: recipe,
  //     url: `https://www.food2fork.com/api/get?key=a9acad6e5c14966634e43f25fd406e44&rId=${
  //       this.props.id
  //     }`
  //   };
  // }
  // // lifecycle hook
  // async componentDidMount() {
  //   try {
  //     const data = await fetch(this.state.url);
  //     const jsonData = await data.json();
  //     const { recipe } = jsonData;

  //     this.setState({
  //       recipe: recipe
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  state = {
    recipe: recipe
  };

  async componentDidMount() {
    const id = this.props.id;
    const url = `https://www.food2fork.com/api/get?key=a9acad6e5c14966634e43f25fd406e44&rId=${id}`;
    try {
      const data = await fetch(url);
      const jsonData = await data.json();
      const { recipe } = jsonData;

      this.setState(
        (state, props) => {
          return { recipe: recipe };
        },
        () => {}
      );
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    console.log(this.state.recipe);
    const {
      image_url,
      publisher,
      publisher_url,
      source_url,
      title,
      ingredients
    } = this.state.recipe;

    const { handleIndex } = this.props;

    return (
      <React.Fragment>
        <div className='container'>
          <div className='row'>
            <div className='col-10 mx-auto col-md-6 my-3'>
              <button
                onClick={() => {
                  handleIndex(1);
                }}
                className='btn btn-warning mb-5 text-capitalize'
              >
                back to recipe list
              </button>
              <img src={image_url} alt='recipe' className='d-block w-100' />
            </div>
            {/* details */}
            <div className='col-10 mx-auto col-md-6 my-3'>
              <h6 className='text-uppercase'>{title}</h6>
              <h6 className='text-warning text-capitalize text-slanted'>
                provided by {publisher}
              </h6>
              <a
                className='btn btn-primary mt-2 text-capitalize'
                href={publisher_url}
                targer='_blank'
                rel='noopener noreferrer'
              >
                publisher webpage
              </a>
              <a
                className='btn btn-success mt-2 text-capitalize mx-3'
                href={source_url}
                targer='_blank'
                rel='noopener noreferrer'
              >
                recipe url
              </a>
              <ul className='list-group mt-4'>
                <h2 className='mt-3 mb-4'>Ingredients</h2>
                {ingredients.map((item, index) => {
                  return (
                    <li key={index} className='list-group-item text-slanted'>
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
