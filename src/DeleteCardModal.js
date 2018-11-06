import React from 'react';

class DeleteCardModal extends React.Component {
    render() {
        return (
            <div className="modal delete-card-modal hidden">
                <div className="modal-content">
                    <span className="close" onClick={this.props.handleDeleteCardModalClose}>
                        &times;
                    </span>
    
                    <form>
                        <h2>Are you sure you want to delete this card?</h2>        
                        <button className="button delete-card-modal__submit" 
                            onClick={this.props.handleDeleteCard}>
                            Delete
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default DeleteCardModal;
