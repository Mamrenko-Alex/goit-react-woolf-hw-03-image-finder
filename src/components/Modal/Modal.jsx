import React, { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'auto';
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.toggleModal();
    }
  };

  render() {
    const { imageUrl, description } = this.props;

    return (
      <div className="overlay" onClick={this.handleOverlayClick}>
        <div className="modal">
          <img src={imageUrl} alt={description} />
        </div>
      </div>
    );
  }
}
