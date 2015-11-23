/**
 * Created by inmaculada on 17/11/15.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import {setState} from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';
import App from './components/App';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';
import Widget from './components/Widget';

/*
const pair = ['Trainspotting', '28 Days Later'];
*/

/* add State / store*/
/*const store = createStore(reducer);
store.dispatch({
    type: 'SET_STATE',
    state: {
        vote: {
            pair: ['Sunshine', '28 Days Later'],
            tally: {Sunshine: 2}
        }
    }
});*/

const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state =>
    store.dispatch(setState(state))
);

const createStoreWithMiddleware = applyMiddleware(
    remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);


const routes = <Route component={App}>
    <Route path="/results" component={ResultsContainer}/>
    <Route path="/" component={VotingContainer} />
</Route>;

ReactDOM.render(
    <Provider store={store}>
        <Router>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);

   /*

const routes = <Route component={App}>
    <Route path="/" component={Widget} />
</Route>;

ReactDOM.render(
    <Provider store={store}>
        <Router>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);*/