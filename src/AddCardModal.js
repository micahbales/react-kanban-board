import React from 'react';

class AddCardModal extends React.Component {
    render() {
        return (
            <div className="modal add-card-modal hidden">
                <div className="modal-content">
                    <span className="close" onClick={this.props.handleAddCardModalClose}>
                        &times;
                    </span>
    
                    <form>
                        <h2>Enter Your Text</h2>
                        <div className="input-row">
                            <input type="text" autoComplete="off" id="text" 
                                    placeholder="Text" className="modal-input" autofocus />
                        </div>
        
                        <button className="button add-card-modal__submit" 
                            onClick={this.props.handleAddCard}>
                            ADD!
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddCardModal;
