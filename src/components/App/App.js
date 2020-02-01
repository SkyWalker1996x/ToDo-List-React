import React, {Component} from 'react';
import AppHeader from '../AppHeader/AppHeader'
import SearchPanel from '../SearchPanel/SearchPanel'
import TodoList from '../TodoList/TodoList'
import ItemStatusFilter from "../ItemStatusFilter/ItemStatusFilter";
import ItemAddForm from "../ItemAddForm/ItemAddForm";
import './App.css'

class App extends Component {

    maxId = 100;

    createTodoItem = (label) => {
        return {
            id: this.maxId++,
            label,
            important: false,
            done: false,
        }
    };

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
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

    toggleProperty = (arr, id, propName) => {
        const idx = arr.findIndex((item) => item.id === id);

        const oldItem = arr[idx];
        const newItem = { ...oldItem,
            [propName]: !oldItem[propName]};

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    };

    handleImportantToggle = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        })
    };

    handleDoneToggle = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    };

    render() {
        const {todoData} =  this.state;
        const doneCount = todoData.filter(item => item.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>

                <div className="top-panel d-flex">
                    <SearchPanel/>
                    <ItemStatusFilter/>
                </div>

                <TodoList
                    todos={todoData}
                    onDeleted={this.handleDeleteItem}
                    onToggleImportant={this.handleImportantToggle}
                    onToggleDone={this.handleDoneToggle}  />

                <ItemAddForm onAdded={this.handleAddItem}/>
            </div>
        );
    }
}

export default App;