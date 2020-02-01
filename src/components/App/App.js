import React, {Component} from 'react';
import AppHeader from '../AppHeader/AppHeader'
import SearchPanel from '../SearchPanel/SearchPanel'
import TodoList from '../TodoList/TodoList'
import ItemStatusFilter from "../ItemStatusFilter/ItemStatusFilter";
import ItemAddForm from "../ItemAddForm/ItemAddForm";
import './App.css'

class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            {id: 1, label: 'Drink Coffee', important: false},
            {id: 2, label: 'Make Awesome App', important: true},
            {id: 3, label: 'Have a lunch', important: false}
        ]
    };

    handleDeleteItem = (id) => {
        this.setState(({todoData}) => {
            const removeIndex = todoData.findIndex((item) => item.id === id);

            const newState = [
                ...todoData.slice(0, removeIndex),
                ...todoData.slice(removeIndex + 1)
            ];

            return {
                todoData: newState
            }
        })
    };

    handleAddItem = (text) => {
        const newItem = {
            id: this.maxId++,
            label: text,
            important: false
        };

        this.setState(({todoData}) => {
            const newState = [
                ...todoData,
                newItem
            ];

            return {
                todoData: newState
            }
        })
    };

    handleImportantToggle = (id) => {
        console.log(`Toggle important: ${id}`)
    };

    handleDoneToggle = (id) => {
        console.log(`Toggle done: ${id}`)
    };



    render() {
        return (
            <div className="todo-app">
                <AppHeader toDo={1} done={3}/>

                <div className="top-panel d-flex">
                    <SearchPanel/>
                    <ItemStatusFilter/>
                </div>

                <TodoList
                    todos={this.state.todoData}
                    onDeleted={this.handleDeleteItem}
                    onImportant={this.handleImportantToggle}
                    onDone={this.handleDoneToggle}  />

                <ItemAddForm onAdded={this.handleAddItem}/>
            </div>
        );
    }
}

export default App;