import React, { Component } from 'react';

import Portal from '../Portal/Portal';

class Modal extends Component {
  handleClose = ev => {
    ev.preventDefault();
    if (this.props.onClose) this.props.onClose();
  };

  render() {
    return (
      <Portal>
        <div
          className={`modal ${this.props.active && 'is-active'}`}
          id="modal-id"
        >
          <a
            onClick={this.handleClose}
            href="#close"
            className="modal-background"
            aria-label="Close"
          />
          <div className="modal-content">
            <header className="modal-card-head">
              <a
                onClick={this.handleClose}
                href="#close"
                className="modal-close is-large"
                aria-label="Close"
              />
              <p className="modal-card-title">{this.props.title}</p>
            </header>
            <section className="modal-card-body">{this.props.body}</section>
            <footer className="modal-card-foot">{this.props.footer}</footer>
          </div>
        </div>
      </Portal>
    );
  }
}

export default Modal;
