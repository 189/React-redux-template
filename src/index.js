// @flow

import './layout.css';
import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import thunk from 'redux-thunk';

import { createStore, combineReducers, applyMiddleware } from 'redux';

function reducer(state = { value : 0}, action){
    const { type, payload } = action;
    switch(type){
        case 'ADD' :
            return {...state, value : state.value + 1}
        case 'INCREASE' :
            return {...state, value : state.value - 1}
        default : 
            return state; 
    }
}

function fetch(id){
    return (dispatch, getState)=>{
        setTimeout(()=>{
            dispatch({ type : 'ADD' });
        }, 1000)
    }
}

/**
 * reducer 记录 state 的变化过程 接受事件和事件数据，返回一个新的 state 状态
 * createStore 创建store， store 对外提供 3个方法
 *      getState 返回状态树快照 
 *      dispatch 分发 action 底层调用 reducer 更新状态树 同时遍历 listener 数组依次执行数组内的 subscriber
 *      subscribe 订阅状态树改变触发回调 更新 view
 * redux-thunk 中间件使 dispach 支持接受函数作为参数,该函数返回(dispatch, getState)=>{}
 */
const store = createStore(reducer, { value : 0 }, applyMiddleware(thunk));
const { getState, dispatch, subscribe  } = store;

class Wrap extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div>
                <Buttons message='this is component B' store={store}></Buttons>
                <Score store={store}></Score>
            </div>    
        );
    }

    componentDidMount(){
        console.log('wrap mount');
    }
};

class Buttons extends React.Component {
    constructor(props){
        super(props);
    }

    add(){
        this.props.store.dispatch({ type : 'ADD' });
    }

    increase(){
        this.props.store.dispatch({ type : 'INCREASE' });
    }

    render(){
        return (<div>
            <div>{ this.props.message }</div>
            <input type='button' value="加一" onClick={ this.add.bind(this) } />
            <input type='button' value="减一" onClick={ this.increase.bind(this) } />
            <input type='button' value="异步加一" onClick={ ()=>{this.props.store.dispatch(fetch(33))} } />
        </div>);
    }
}

class Score extends React.Component {
    constructor(props){
        super(props);
    }
    
    render(){
        const store = this.props.store;
        return <div><span>{ store.getState().value }</span></div>; 
    }
}

const render = ()=>{
    ReactDOM.render(<Wrap message='Hello world' />, document.querySelector('#box'));
};
render();
store.subscribe(render);

