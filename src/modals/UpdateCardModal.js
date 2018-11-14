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
                        <div className='form-row'>
                            <input type='text' autoComplete='off' id='text' 
                                    placeholder='Text' className='modal-input'
                                    defaultValue={this.props.text} />

                            <button className='button update' 
                                    onClick={this.props.handleUpdateCard}>
                                UPDATE
                            </button>
                        </div>

                        <div className='form-row delete'>
                            <h4>DELETE CARD</h4>        
                            <button className='button delete' 
                                    onClick={this.props.handleDeleteCard}>
                                DELETE
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default UpdateCardModal;
