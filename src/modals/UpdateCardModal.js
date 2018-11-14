import React from 'react';

class UpdateCardModal extends React.Component {
    render() {
        return (
            <div className='modal update-card-modal hidden'>
                <div className='modal-content'>
                    <span className='close' onClick={this.props.handleUpdateCardModalClose}>
                        &times;
                    </span>

                    <h2>Update Card</h2>
    
                    <form>
                        <input type='text' autoComplete='off' id='text' 
                                placeholder='Text' className='modal-input'/>

                        <button className='button update-card-modal__update-button' 
                                onClick={this.props.handleUpdateCard}>
                            UPDATE
                        </button>

                        <h4>DELETE CARD</h4>        
                        <button className='button delete-card-modal__submit' 
                                onClick={this.props.handleDeleteCard}>
                            DELETE
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default UpdateCardModal;
