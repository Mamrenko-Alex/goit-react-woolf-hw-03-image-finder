import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handlerChange = event => {
    this.setState({ query: event.target.value });
  };

  handlerSubmit = event => {
    event.preventDefault();
    if (this.state.query === '') {
      return;
    }
    this.props.onSubmit(this.state.query);
    const element = document.querySelector('#js_anchor');
    element.scrollIntoView({
      behavior: 'smooth',
    });
    this.setState({
      query: '',
    });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handlerSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            onChange={this.handlerChange}
            value={this.state.query}
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
