import React, { Component } from 'react';

class Modal extends Component {
	handleClose = (ev) => {
		ev.preventDefault();
		if (this.props.onClose) this.props.onClose();
	}

	render() {
		return (
			<div className={`modal ${this.props.active && 'active'}`} id="modal-id">
				<a onClick={this.handleClose} href="#close" className="modal-overlay" aria-label="Close" ></a>
				<div className="modal-container">
					<div className="modal-header">
						<a onClick={this.handleClose} href="#close" className="btn btn-clear float-right" aria-label="Close"></a>
						<div className="modal-title h5">{this.props.title}</div>
					</div>
					<div className="modal-body">
						<div className="content">
							{this.props.body}
						</div>
					</div>
					<div className="modal-footer">
						{this.props.footer}
					</div>
				</div>
			</div>
		);
	}
};

export default Modal;