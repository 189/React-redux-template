
import './layout.css';
import React from 'react';
import ReactDOM from 'react-dom';

const box = document.querySelector('#box');

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

ReactDOM.render(<Message />, box);




