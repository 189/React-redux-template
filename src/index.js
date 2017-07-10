// @flow

import './layout.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from "mobx-react";

import { cube } from './utils';

const box = document.querySelector('#box');
console.log('loaded3');
console.log(cube(3));

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.name = 'lily';
    }

    render() {
        return ( <h1>{ this.name }</h1> );
    }
};

const aa = {
    name: 'ke2y1',
    lily: 'key2'
};

// console.log(Object.values(aa));

// ReactDOM.render( < Message / > , box);


@observer class TodoListView extends React.Component {
    render() {
        return <div>
            <ul>
                {this.props.todoList.todos.map(todo =>
                    <TodoView todo={todo} key={todo.id} />
                )}
            </ul>
            Tasks left: {this.props.todoList.unfinishedTodoCount}
        </div>
    }
}

const TodoView = observer(({todo}) =>
    <li>
        <input
            type="checkbox"
            checked={todo.finished}
            onClick={() => todo.finished = !todo.finished}
        />{todo.title}
    </li>
)

const store = new TodoList();
ReactDOM.render(<TodoListView todoList={store} />, box);

