import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import firebase from './firebase.js';

class App extends Component {

    constructor() {
        super();
        this.state = {
          sessions: []
        };
        this.renderSessions = this.renderSessions.bind(this);
        this.renderEvents = this.renderEvents.bind(this);
    }

    componentDidMount() {
        const sessionsRef = firebase.database().ref('sessions');

        sessionsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    events: items[item].events,
                    num: item
                });
            }
            this.setState({
                sessions: newState
            });
        });
    }

    renderSessions = function(sessions){
        var ret = [];

        sessions.forEach((session, i) => {
            console.log(session)
            ret.push(
                [(<text>Session: {i}</text>),
                this.renderEvents(session.events)]
            )
        });

        return ret
    };

    renderEvents = function(events){
        console.log(events)
        var ret = [];

        events.forEach((event) => {
            ret.push((<text>{event.eventType.toString()}</text>))
        });

        return ret
    };


    render() {
    return (
      <div className="App">
        <header className="App-header">
            {/*{this.state.sessions.map((item) => {*/}
                {/*return (item.events.map(event => {*/}
                    {/*return (*/}
                        {/*<text>{event.eventType.toString()}</text>*/}
                    {/*)*/}
                {/*}))*/}
            {/*})}*/}
            {this.renderSessions(this.state.sessions)}
        </header>
      </div>
    );
  }
}

export default App;
