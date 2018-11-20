import React from "react";

import { ResponsiveContainer, Legend, Scatter, ScatterChart, Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea } from 'recharts';
import moment from 'moment';

var randomColor = require('randomcolor');

export default class StreamingDemo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sessions: props.session,
            colors: ["red", "blue", "pink", "green", "purple"],
            session: {
                events: [],
                songStates: [],
                songIDs: {}
            }
        };

        this.state.session.songIDs[-1] = "NA";
        this.aggregateSessions();

        this.timeFormatter = this.timeFormatter.bind(this);
        this.songName = this.songName.bind(this);
        this.songID = this.songID.bind(this);
        this.aggregateSessions = this.aggregateSessions.bind(this);
    }

    aggregateSessions(){
        this.state.sessions.map((session, i) => {
            let startDate = session.events[0].date;
            //aggregate events
            session.events.map((event, j) => {
                event.date = event.date - startDate;
                this.state.session.events.push(event)
            });
            //aggregate songstates
            session.songStates.map((state, j) => {
                this.state.session.songStates.push(state)
            });
            //aggregate tracks
            this.state.session.songIDs = Object.assign(this.state.session.songIDs, session.songIDs);
        })
        this.state.session.events.map((event) => {
            event[this.songID(event)] = event.pain
        });
    }

    songID(event){
        if (event.songState >= 0){
            let songState = this.state.session.songStates[event.songState];
            if (songState.state.playing) {
                return songState.songID
            }else{
                return -1
            }
        }else{
            return -1
        }
    }

    songName(id){
        if (id == -1){
            return "NA"
        }else{
            return this.state.session.songIDs[id].name
        }
    }

    handleTooltip(e){
        if (e.active && e.payload!=null && e.payload[0]!=null) {
            return (<div className="custom-tooltip">
                <p>{e.payload[0].payload["pain"]}</p>
                {e.payload[0].payload["track"] ? <p>{e.payload[0].payload["track"].name}</p> : null}
            </div>);
        }
        else{
            return "";
        }
    }

    timeFormatter(tick){
        return moment(tick - this.state.session.events[0].date).format('mm:ss');
    }

    render() {
        const { data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2 } = this.state;

        return (
                <ResponsiveContainer height={400} width="99%" >
                <LineChart data={this.state.session.events}
                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <YAxis type="number" domain={[0, 10]}/>
                    <XAxis type="number" dataKey="date"  domain={['dataMin', 'dataMax']} scale="time" tickFormatter={this.timeFormatter}/>
                    {/*<XAxis type="category" dataKey={this.songID} xAxisId={1} allowDuplicatedCategory={false} interval='preserveStartEnd' hide={true}/>*/}
                    {/*<XAxis type="category" dataKey="eventType" xAxisId={2} interval='preserveStartEnd' hide={true}/>*/}
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip labelFormatter={this.timeFormatter}/>
                    <Legend />
                    {this.state.session.songIDs ? Object.keys(this.state.session.songIDs).map((k,i) => {
                        let color = randomColor({
                            luminosity: 'bright',
                            hue: this.state.colors[i % this.state.colors.length]
                        });
                        return (<Line name={this.songName(k)} type="monotone" dataKey={k}
                                      stroke={(k == -1) ? "none" : color} activeDot={{r: 8, stroke: (k == -1) ? "#000000" : color}} dot={{stroke: (k == -1) ? "#000000" : color}} />)
                    }) : null}
                </LineChart>
                </ResponsiveContainer>
        );
    }
}