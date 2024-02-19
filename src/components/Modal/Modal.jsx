import React, { Component } from 'react';

export class Modal extends Component {
  state = {
    isModalOpen: false,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.setState({ isModalOpen: this.props.isOpen });
    }
  }

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
    this.props.onClose();
  };

  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.handleCloseModal();
    }
  };

  render() {
    const { isModalOpen } = this.state;
    const { isOpen, imageURL } = this.props;

    return (
      <div
        className={`overlay ${isModalOpen ? 'open' : ''}`}
        onClick={this.handleCloseModal}
      >
        <div className="modal" onClick={e => e.stopPropagation()}>
          <img src={imageURL} alt="" />
        </div>
      </div>
    );
  }
}
