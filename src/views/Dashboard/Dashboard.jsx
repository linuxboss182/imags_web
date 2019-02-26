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

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import firebase from 'db.js';

const header = {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "300",
    lineHeight: "1.5em",
    textAlign: "center",
    fontSize: "medium"
};

class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            value: 0,
            sessions: [],
            participants: {},
            groups: {}
        };
        this.buildGroups = this.buildGroups.bind(this);
    }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

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
            sessions: newState
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

  render() {
    const { classes } = this.props;
    this.buildGroups();

      return (
      <div>
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <p style={header}>This website was created for the propose of the IMAGS study, which seeks to study music's affect on chronic pain. For more information visit <a href="https://drive.google.com/file/d/1aM3L23doCdmQw2NVH3asSDimXZGwtJRB/view">IMAGS</a>.</p>
                </Card>
            </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Sessions Reported</p>
                <h3 className={classes.cardTitle}>
                    {this.state.sessions.length}
                </h3>

              </CardHeader>
              <CardFooter stats>
                  {/*<div className={classes.stats}>*/}
                      {/*<Update />*/}
                      {/*Just Updated*/}
                  {/*</div>*/}
                  <a href="https://imags-web.firebaseapp.com/users" onClick={e => e.preventDefault()}>
                      View Sessions
                  </a>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Groups</p>
                <h3 className={classes.cardTitle}>{Object.keys(this.state.groups).length}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                    <a href="https://imags-web.firebaseapp.com/groups" onClick={e => e.preventDefault()}>
                        Manage Groups
                    </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>Participants</p>
                <h3 className={classes.cardTitle}>{Object.keys(this.state.participants).length}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                    <a href="https://imags-web.firebaseapp.com/users" onClick={e => e.preventDefault()}>
                        Invite Participants
                    </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
            <GridItem xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader color="danger" stats icon>
                        <CardIcon color="danger">
                            <Icon>info_outline</Icon>
                        </CardIcon>
                        <p className={classes.cardCategory}>Errors</p>
                        <h3 className={classes.cardTitle}>0</h3>
                    </CardHeader>
                    <CardFooter stats>
                        <div className={classes.stats}>
                            <LocalOffer />
                            Tracked from Github
                        </div>
                    </CardFooter>
                </Card>
            </GridItem>
        </GridContainer>
        {/*<GridContainer>*/}
          {/*<GridItem xs={12} sm={12} md={4}>*/}
            {/*<Card chart>*/}
              {/*<CardHeader color="success">*/}
                {/*<ChartistGraph*/}
                  {/*className="ct-chart"*/}
                  {/*data={dailySalesChart.data}*/}
                  {/*type="Line"*/}
                  {/*options={dailySalesChart.options}*/}
                  {/*listener={dailySalesChart.animation}*/}
                {/*/>*/}
              {/*</CardHeader>*/}
              {/*<CardBody>*/}
                {/*<h4 className={classes.cardTitle}>Daily Sessions</h4>*/}
                {/*<p className={classes.cardCategory}>*/}
                  {/*<span className={classes.successText}>*/}
                    {/*<ArrowUpward className={classes.upArrowCardCategory} /> 55%*/}
                  {/*</span>{" "}*/}
                  {/*increase in today sessions.*/}
                {/*</p>*/}
              {/*</CardBody>*/}
              {/*<CardFooter chart>*/}
                {/*<div className={classes.stats}>*/}
                  {/*<AccessTime /> updated 4 minutes ago*/}
                {/*</div>*/}
              {/*</CardFooter>*/}
            {/*</Card>*/}
          {/*</GridItem>*/}
          {/*<GridItem xs={12} sm={12} md={4}>*/}
            {/*<Card chart>*/}
              {/*<CardHeader color="warning">*/}
                {/*<ChartistGraph*/}
                  {/*className="ct-chart"*/}
                  {/*data={emailsSubscriptionChart.data}*/}
                  {/*type="Bar"*/}
                  {/*options={emailsSubscriptionChart.options}*/}
                  {/*responsiveOptions={emailsSubscriptionChart.responsiveOptions}*/}
                  {/*listener={emailsSubscriptionChart.animation}*/}
                {/*/>*/}
              {/*</CardHeader>*/}
              {/*<CardBody>*/}
                {/*<h4 className={classes.cardTitle}>Participants</h4>*/}
                {/*<p className={classes.cardCategory}>*/}
                  {/*Last Study Performance*/}
                {/*</p>*/}
              {/*</CardBody>*/}
              {/*<CardFooter chart>*/}
                {/*<div className={classes.stats}>*/}
                  {/*<AccessTime /> study sent 2 days ago*/}
                {/*</div>*/}
              {/*</CardFooter>*/}
            {/*</Card>*/}
          {/*</GridItem>*/}
          {/*<GridItem xs={12} sm={12} md={4}>*/}
            {/*<Card chart>*/}
              {/*<CardHeader color="danger">*/}
                {/*<ChartistGraph*/}
                  {/*className="ct-chart"*/}
                  {/*data={completedTasksChart.data}*/}
                  {/*type="Line"*/}
                  {/*options={completedTasksChart.options}*/}
                  {/*listener={completedTasksChart.animation}*/}
                {/*/>*/}
              {/*</CardHeader>*/}
              {/*<CardBody>*/}
                {/*<h4 className={classes.cardTitle}>Completed Sessions</h4>*/}
                {/*<p className={classes.cardCategory}>*/}
                  {/*Last Study Performance*/}
                {/*</p>*/}
              {/*</CardBody>*/}
              {/*<CardFooter chart>*/}
                {/*<div className={classes.stats}>*/}
                  {/*<AccessTime /> study sent 2 days ago*/}
                {/*</div>*/}
              {/*</CardFooter>*/}
            {/*</Card>*/}
          {/*</GridItem>*/}
        {/*</GridContainer>*/}
        {/*<GridContainer>*/}
          {/*<GridItem xs={12} sm={12} md={6}>*/}
            {/*<CustomTabs*/}
              {/*title="Tasks:"*/}
              {/*headerColor="primary"*/}
              {/*tabs={[*/}
                {/*{*/}
                  {/*tabName: "Bugs",*/}
                  {/*tabIcon: BugReport,*/}
                  {/*tabContent: (*/}
                    {/*<Tasks*/}
                      {/*checkedIndexes={[0, 3]}*/}
                      {/*tasksIndexes={[0, 1, 2, 3]}*/}
                      {/*tasks={bugs}*/}
                    {/*/>*/}
                  {/*)*/}
                {/*},*/}
                {/*{*/}
                  {/*tabName: "Website",*/}
                  {/*tabIcon: Code,*/}
                  {/*tabContent: (*/}
                    {/*<Tasks*/}
                      {/*checkedIndexes={[0]}*/}
                      {/*tasksIndexes={[0, 1]}*/}
                      {/*tasks={website}*/}
                    {/*/>*/}
                  {/*)*/}
                {/*},*/}
                {/*{*/}
                  {/*tabName: "Server",*/}
                  {/*tabIcon: Cloud,*/}
                  {/*tabContent: (*/}
                    {/*<Tasks*/}
                      {/*checkedIndexes={[1]}*/}
                      {/*tasksIndexes={[0, 1, 2]}*/}
                      {/*tasks={server}*/}
                    {/*/>*/}
                  {/*)*/}
                {/*}*/}
              {/*]}*/}
            {/*/>*/}
          {/*</GridItem>*/}
          {/*<GridItem xs={12} sm={12} md={6}>*/}
            {/*<Card>*/}
              {/*<CardHeader color="warning">*/}
                {/*<h4 className={classes.cardTitleWhite}>Employees Stats</h4>*/}
                {/*<p className={classes.cardCategoryWhite}>*/}
                  {/*New employees on 15th September, 2016*/}
                {/*</p>*/}
              {/*</CardHeader>*/}
              {/*<CardBody>*/}
                {/*<Table*/}
                  {/*tableHeaderColor="warning"*/}
                  {/*tableHead={["ID", "Name", "Salary", "Country"]}*/}
                  {/*tableData={[*/}
                    {/*["1", "Dakota Rice", "$36,738", "Niger"],*/}
                    {/*["2", "Minerva Hooper", "$23,789", "Curaçao"],*/}
                    {/*["3", "Sage Rodriguez", "$56,142", "Netherlands"],*/}
                    {/*["4", "Philip Chaney", "$38,735", "Korea, South"]*/}
                  {/*]}*/}
                {/*/>*/}
              {/*</CardBody>*/}
            {/*</Card>*/}
          {/*</GridItem>*/}
        {/*</GridContainer>*/}
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
