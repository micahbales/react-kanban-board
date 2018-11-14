import React from 'react';

class UpdateColumnModal extends React.Component {

    constructor(props) {
        super();
        this.state = {selectValue: props.headerColor}
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleSelectChange(e) {
        this.setState({selectValue: e.currentTarget.value});
    }

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
                            <input type='text' autoComplete='off' id='title' 
                                    placeholder='Title' className='modal-input' 
                                    defaultValue={this.props.title} maxLength="25" />

                            <select id='header-color-select' 
                                    defaultValue={this.props.headerColor} 
                                    onChange={this.handleSelectChange}>
                                {
                                    this.props.colors.map((color, i) => {
                                        return <option value={color.value} key={i}>
                                            {color.name}
                                        </option>
                                    })
                                }
                            </select>
                            
                            <button className='button update update-column-modal__update-button' 
                                    onClick={this.props.handleUpdateColumn}>
                                UPDATE
                            </button>
                        </div>

                        <div className='form-row delete'>
                            <h4>DELETE COLUMN</h4>
                            <p>(Will also delete all cards!)</p>
                            <button className='button delete update-column-modal__delete-button' 
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
