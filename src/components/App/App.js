import React, {Component} from 'react';
import AppHeader from '../AppHeader/AppHeader'
import SearchPanel from '../SearchPanel/SearchPanel'
import TodoList from '../TodoList/TodoList'
import ItemStatusFilter from "../ItemStatusFilter/ItemStatusFilter";
import './App.css'

class App extends Component{

    state = {
        todoData: [
            {id: 1, label: 'Drink Coffee', important: false},
            {id: 2, label: 'Make Awesome App', important: true },
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

    render() {
        return (
            <div className="todo-app" onClick={this.test}>
                <AppHeader toDo={1} done={3} />
                <div className="top-panel d-flex">
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>

                <TodoList todos={this.state.todoData} onDeleted={this.handleDeleteItem}/>
            </div>
        );
    }
}

export default App;