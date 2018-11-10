import React from 'react';

class AddColumnModal extends React.Component {
    render() {
        return (
            <div className='modal add-column-modal hidden'>
                <div className='modal-content'>
                    <span className='close' onClick={this.props.handleAddColumnModalClose}>
                        &times;
                    </span>
    
                    <form>
                        <h2>Column Title:</h2>
                        <div className='input-row'>
                            <input type='text' autoComplete='off' id='title' 
                                    placeholder='Title' className='modal-input' />
                        </div>
        
                        <button className='button add-column-modal__submit' 
                            onClick={this.props.handleAddColumn}>
                            ADD
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddColumnModal;
