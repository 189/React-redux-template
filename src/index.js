// @flow

import './layout.css';
import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

const box = document.querySelector('#box');

class Hello extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            time : moment().format('MMMM Do YYYY, h:mm:ss a')
        };
    }

    render(){
        return (
            <div>
                <h1>{ this.props.message }</h1>
                <span>now time is { this.state.time }</span>
            </div>
        );
    }

    componentDidMount(){
        setInterval(()=>{
            this.setState({
                time : moment().format('MMMM Do YYYY, h:mm:ss a')
            });
        }, 1000)
    }
}

Hello.propTypes = {
    message : PropTypes.string.isRequired
};


ReactDOM.render(<Hello message='Hello world' />, box);

