import React from "react";

import { Legend, Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea } from 'recharts';
import moment from 'moment';


export default class StreamingDemo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            session: props.session,
            colors: ["#e83428", "#18d428", "#8884d8"]
        };

        this.state.session.a = {}
        this.state.session.events.map((event) => {
            // event.pain = event.pain - 1;
            (this.state.session.a[this.songName(event)] = this.state.session.a[this.songName(event)] || []).push(event)
            event[this.songName(event)] = event.pain
        });

        console.log(this.state.session)

        this.timeFormatter = this.timeFormatter.bind(this);
        this.songFormatter = this.songFormatter.bind(this);
        this.songName = this.songName.bind(this);
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
        return moment(tick).format('HH:mm:ss');
    }

    songFormatter(tick){
        return (tick >= 0) ? (this.state.session.songStates[tick].track) ? this.state.session.songStates[tick].track.name: "" : ""
    }

    songName(event){
        return (event.songState >= 0) ? (this.state.session.songStates[event.songState].track) ? this.state.session.songStates[event.songState].track.name: "" : ""
    }

    render() {
        const { data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2 } = this.state;

        return (
            <div className="highlight-bar-charts">
                <LineChart width={1200} height={400} data={this.state.session.events}
                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <YAxis type="number" domain={[0, 10]}/>
                    <XAxis type="number" dataKey="date"  domain={['dataMin', 'dataMax']} scale="time" tickFormatter={this.timeFormatter}/>
                    <XAxis type="category" dataKey={this.songName} xAxisId={1} allowDuplicatedCategory={false} interval='preserveStartEnd'/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    {/*<Tooltip content={this.handleTooltip}/>*/}
                    <Legend />
                    {/*<Line type="monotone" dataKey="pain" stroke="#8884d8" activeDot={{r: 8}}/>*/}
                    {/*<Line type="monotone" dataKey="test" stroke="#18d428" activeDot={{r: 8}}/>*/}

                    {Object.keys(this.state.session.a).map((k,i) => {
                        console.log(k)
                        return (<Line type="monotone" dataKey={k} stroke={this.state.colors[i]} activeDot={{r: 8}}/>)
                    })}

                </LineChart>
            </div>
        );
    }
}