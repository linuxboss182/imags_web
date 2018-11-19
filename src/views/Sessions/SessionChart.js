import React from "react";

import { Legend, Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea } from 'recharts';
import moment from 'moment';

export default class StreamingDemo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            session: props.session,
            colors: ["#e83428", "#18d428", "#8884d8"], //TODO this should be a generated
        };

        this.state.session.events.map((event) => {
            event[this.songID(event)] = event.pain
        });

        this.timeFormatter = this.timeFormatter.bind(this);
        this.songName = this.songName.bind(this);
        this.songID = this.songID.bind(this);
    }

    songID(event){
        if (event.songState >= 0){
            let songState = this.state.session.songStates[event.songState];
            return songState.songID
        }else{
            return -1
        }
    }

    songName(id){
        if (id === -1){
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
        return moment(tick).format('HH:mm:ss');
    }

    render() {
        const { data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2 } = this.state;

        return (
            <div className="highlight-bar-charts">
                <LineChart width={1200} height={400} data={this.state.session.events}
                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <YAxis type="number" domain={[0, 10]}/>
                    <XAxis type="number" dataKey="date"  domain={['dataMin', 'dataMax']} scale="time" tickFormatter={this.timeFormatter}/>
                    <XAxis type="category" dataKey={this.songID} xAxisId={1} allowDuplicatedCategory={false} interval='preserveStartEnd' hide={true}/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip />
                    <Legend />
                    {Object.keys(this.state.session.songIDs).map((k,i) => {
                        return (<Line name={this.songName(k)} type="monotone" dataKey={k} stroke={this.state.colors[i]} activeDot={{r: 8}} />)
                    })}

                </LineChart>
            </div>
        );
    }
}