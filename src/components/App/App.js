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
        ],
        term: '',
        filter: 'all'
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
        const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName]
        };

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

    onSearchChange = (term) => {
        this.setState({term})
    };

    onFilterChange = (filter) => {
        this.setState({filter})
    };

    search(items, term) {
        if (term === '') {
            return items
        }

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
        })
    }

    filter(items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }

    render() {
        const {todoData, term, filter} = this.state;
        const visibleItems = this.filter(this.search(todoData, term), filter);
        const doneCount = todoData.filter(item => item.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>

                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter filter={filter}
                                      onFilterChange={this.onFilterChange}/>
                </div>

                <TodoList
                    todos={visibleItems}
                    onDeleted={this.handleDeleteItem}
                    onToggleImportant={this.handleImportantToggle}
                    onToggleDone={this.handleDoneToggle}/>

                <ItemAddForm onAdded={this.handleAddItem}/>
            </div>
        );
    }
}

export default App;