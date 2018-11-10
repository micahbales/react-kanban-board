import React from 'react';

class UpdateColumnModal extends React.Component {
    render() {
        return (
            <div className='modal update-column-modal hidden'>
                <div className='modal-content'>
                    <span className='close' onClick={this.props.handleUpdateColumnModalClose}>
                        &times;
                    </span>

                    <h2>Update Column</h2>
    
                    <form>
                        <div className='form-row'>
                            <h4>Column Title</h4>
                            <input type='text' autoComplete='off' id='title' 
                                    placeholder='Title' className='modal-input' 
                                    defaultValue={this.props.title} maxLength="25" />
                            
                            <button className='button update-column-modal__update-button' 
                                    onClick={this.props.handleUpdateColumn}>
                                UPDATE
                            </button>
                        </div>

                        <div className='form-row'>
                            <h4>Delete Column</h4> 
                            <button className='button update-column-modal__delete-button' 
                                onClick={this.props.handleDeleteColumn}>
                                DELETE
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default UpdateColumnModal;
