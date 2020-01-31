import React, {Component} from 'react';

import './TodoListItem.css';

class TodoListItem extends Component{

    state = {
        done: false,
        important: this.props.important
    };

    onLabelChange = () => {
        this.setState(({done}) => {
            return {
                done: !done
            }
        })
    };

    onImportantChange = () => {
        this.setState(({important}) => {
            return {
                important: !important
            };
        })
    };

    render() {
        const {label} = this.props;
        const { done, important } = this.state;
        const style = {
            color: important ? 'steelblue' : 'black',
            fontWeight: important ? 'bold' : 'normal'
        };
        let classNames = 'todo-list-item';
        if (done) {
            classNames += ' done'
        }

        return (
            <span className={classNames}>
            <span
                className="todo-list-item-label"
                style={style}
                onClick={ this.onLabelChange }>
                {label}
            </span>

            <button type="button"
                    className="btn btn-outline-success btn-sm float-right"
                    onClick={ this.onImportantChange }>
                    <i className="fa fa-exclamation"/>
            </button>

            <button type="button"
                    className="btn btn-outline-danger btn-sm float-right">
                    <i className="fa fa-trash-o"/>
            </button>
        </span>
        );
    }
}

/*const TodoListItemFunc = ({label, important = false}) => {

    const style = {
        color: important ? 'steelblue' : 'black',
        fontWeight: important ? 'bold' : 'normal'
    };

    return (
        <span className="todo-list-item">
            <span
                className="todo-list-item-label"
                style={style}>
                {label}
            </span>

            <button type="button"
                    className="btn btn-outline-success btn-sm float-right">
                    <i className="fa fa-exclamation"/>
            </button>

            <button type="button"
                    className="btn btn-outline-danger btn-sm float-right">
                    <i className="fa fa-trash-o"/>
            </button>
        </span>
    );
};*/

export default TodoListItem;