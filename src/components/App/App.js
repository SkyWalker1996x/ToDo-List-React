import React from 'react';
import AppHeader from '../AppHeader/AppHeader'
import SearchPanel from '../SearchPanel/SearchPanel'
import TodoList from '../TodoList/TodoList'
import ItemStatusFilter from "../ItemStatusFilter/ItemStatusFilter";
import './App.css'

const App = () => {

    const todoData = [
        {id: 1, label: 'Drink Coffee', important: false},
        {id: 2, label: 'Make Awesome App', important: true },
        {id: 3, label: 'Have a lunch', important: false}
    ];

    return (
        <div className="todo-app">
            <AppHeader toDo={1} done={3} />
            <div className="top-panel d-flex">
                <SearchPanel />
                <ItemStatusFilter />
            </div>

            <TodoList todos={todoData} />
        </div>
    );
};

export default App;