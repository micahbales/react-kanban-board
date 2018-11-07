import React from 'react';

class DeleteColumnModal extends React.Component {
    render() {
        return (
            <div className="modal delete-column-modal hidden">
                <div className="modal-content">
                    <span className="close" onClick={this.props.handleDeleteColumnModalClose}>
                        &times;
                    </span>
    
                    <form>
                        <h2>Are you sure you want to delete this column?</h2>
                        <p>All associated cards will also be deleted!</p>      
                        <button className="button delete-column-modal__submit" 
                            onClick={this.props.handleDeleteColumn}>
                            Delete
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default DeleteColumnModal;
