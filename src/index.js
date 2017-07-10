
import './layout.css';
import React from 'react';
import ReactDOM from 'react-dom';

import { cube  } from './utils';

const box = document.querySelector('#box');

console.log(cube(3));

class Message extends React.Component {
    constructor(props){
        super(props);
        this.name = 'lily';
    }

    render(){
        return (
            <h1>{ this.name }</h1>
        );
    }
};


const aa = {
    name : 'ke2y1',
    lily : 'key2'
};

console.log(Object.values(aa));

ReactDOM.render(<Message />, box);




