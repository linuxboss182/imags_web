import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";


import { bugs, website, server } from "variables/general.jsx";

import {
    dailySalesChart,
    emailsSubscriptionChart,
    completedTasksChart
} from "variables/charts.jsx";

import firebase from 'db.js';
import GroupChart from './GroupChart.js'

const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    },
    sessionBody: {
        margin: 'auto',
        width: '100%'
    }
};

const header = {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "300",
    lineHeight: "1.5em",
    textAlign: "center",
    fontSize: "medium"
};

class Groups extends React.Component {
    constructor() {
        super();
        this.state = {
            sessions: [],
            participants: {},
            groups: {}
        }
        this.buildData = this.buildData.bind(this);
        this.buildGroups = this.buildGroups.bind(this);
    }

    componentDidMount(){
        //Load data
        const sessionsRef = firebase.database().ref('sessions');
        sessionsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    events: items[item].events,
                    songStates: items[item].songStates,
                    songIDs: items[item].songIDs,
                    participant: items[item].participant,
                    num: item
                });
            }
            this.setState({
                sessions: newState,
                groups: {"All" : newState}
            });
        });

        const ParticipantRef = firebase.database().ref('staticParticipantInfo');
        ParticipantRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = {};
            for (let item in items) {
                newState[item] = {
                    key: item,
                    id: items[item].id,
                    age: items[item].age,
                    gender: items[item].gender,
                    marital: items[item].marital,
                    name: items[item].name,
                    painDur: items[item].painDur,
                    race: items[item].race,
                    groups: items[item].groups
                }
            }
            this.setState({
                participants: newState
            });
        });
    }

    buildGroups(){

        //For each session, add to group
        this.state.sessions.map((session, i) => {
            let participant = this.state.participants[session.participant];
            // console.log(participant.groups)
            if(participant) {
                if (this.state.groups.hasOwnProperty(participant.groups)) {
                    this.state.groups[participant.groups].push(session)
                } else {
                    this.state.groups[participant.groups] = [session]
                }
            }

        });

    }

    buildData(session){
        var ret = [];

        session.events.forEach((event) => {
            ret.push([event.date,
                event.eventType,
                (event.track) ? event.track.name : "N/A",
                (event.pain) ? event.pain: "N/A",
            ])
        });

        return ret
    }

    render() {
        const { classes } = this.props;
        this.buildGroups();

        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <p style={header}>This website was created for the propose of the IMAGS study, which seeks to study music's affect on chronic pain. For more information visit <a href="https://drive.google.com/file/d/1aM3L23doCdmQw2NVH3asSDimXZGwtJRB/view">IMAGS</a>.
                            <br/>Below are all of the sessions aggregated by group. To modify groups assign the User to a new group. Click the songs in the legend to see thier attributes. To learn more about the song attributes, visit <a href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/">the Spotify documentation </a>.
                        </p>
                    </Card>
                </GridItem>
                {Object.keys(this.state.groups).map((group, i) => {
                        return (<GridItem xs={12} sm={12} md={12} key={i}>
                            <Card>
                                <CardHeader color="primary">
                                    <h4 className={classes.cardTitleWhite}>{group === "undefined" ?  "No Group" : "Group: " + group} </h4>
                                    <p className={classes.cardCategoryWhite}>
                                        ID: {group}
                                    </p>
                                </CardHeader>
                                <CardBody className={classes.sessionBody}>
                                    {/*<Table*/}
                                    {/*tableHeaderColor="primary"*/}
                                    {/*tableHead={["Time", "Event", "Track", "Pain"]}*/}
                                    {/*tableData={this.buildData(session)}*/}
                                    {/*/>*/}
                                    <GroupChart session={this.state.groups[group]}/>
                                </CardBody>
                            </Card>
                        </GridItem>)
                })}
            </GridContainer>
        );
    }
}

Groups.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Groups);