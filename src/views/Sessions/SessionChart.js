import React from "react";

import { Legend, Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea } from 'recharts';

const initialState = {
    left : 'dataMin',
    right : 'dataMax',
    refAreaLeft : '',
    refAreaRight : '',
    top : 'dataMax+1',
    top2 : 'dataMax+20',
    bottom2 : 'dataMin-20',
    animation : true
};

export default class StreamingDemo extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        this.state.session = props.session;
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

    render() {
        const { data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2 } = this.state;

        return (
            <div className="highlight-bar-charts">
                <LineChart width={1200} height={400} data={this.state.session.events}
                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <YAxis type="number" domain={[0, 10]}/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    {/*<Tooltip content={this.handleTooltip}/>*/}
                    <Legend />
                    <Line type="monotone" dataKey="pain" stroke="#8884d8" activeDot={{r: 8}}/>
                </LineChart>
            </div>
        );
    }
}