import React, { Component } from "react";
import './ItemAddForm.css'

class ItemAddForm extends Component{

    render() {
        return (
            <div className="item-add-form">
                <button className="btn btn-outline-secondary"
                        onClick={() => this.props.onAdded(`Hello world!`)}>
                    Add item
                </button>
            </div>
        )
    }
}

export default ItemAddForm;