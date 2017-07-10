// @flow

import './layout.css';
import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';

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
        return (<h1>{this.name}</h1>);
    }
};

const aa = {
    name: 'ke2y1',
    lily: 'key2'
};

async function determineDate() {
    const moment = await import('moment');
    return moment().format('LLLL');
}

determineDate().then(function(str){
    console.log(str);
});

// console.log(Object.values(aa));

ReactDOM.render(< Message />, box);


