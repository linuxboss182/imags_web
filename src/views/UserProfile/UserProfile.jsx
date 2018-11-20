import React from "react";
import PropTypes from "prop-types";
import update from 'immutability-helper';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import firebase from 'db.js';

import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
    participantHeader:{
        color: 'white'
    },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class UserProfile extends React.Component {

    constructor(){
      super();
      this.state = {
        participants: []
      }
        this.newParticipant = this.newParticipant.bind(this);
      this.updateParticipant = this.updateParticipant.bind(this);
      this.makeID = this.makeID.bind(this);
    }

    componentDidMount(){
        //Load data
        const ParticipantRef = firebase.database().ref('staticParticipantInfo');
        ParticipantRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            console.log(items)
            for (let item in items) {
                newState.push({
                    key: item,
                    id: items[item].id,
                    age: items[item].age,
                    gender: items[item].gender,
                    marital: items[item].marital,
                    name: items[item].name,
                    painDur: items[item].painDur,
                    race: items[item].race
                });
                //console.log(item)
                // console.log(Object.keys(item)[0])
            }
            this.setState({
                participants: newState
            });
        });
    }

    makeID(length){
        let output = ""
        let viableChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

        for(let i = 0; i < length;i++){
            output+= viableChars.charAt(Math.floor(Math.random()*viableChars.length))
        }

        return output
    }

    newParticipant(){
        const staticInfoRef = firebase.database().ref('staticParticipantInfo');
        const  staticInfoSession = {
            id: this.makeID(5),
            name: "",
            age: "",
            gender: "",
            race: "",
            marital: "",
            painDur: ""
        };

        staticInfoRef.push(staticInfoSession);

        const dynamicInfoRef = firebase.database().ref('dynamicParticipantInfo');
        const dynamicInfoSession = {
            participant: 12345,
            sbp: null,
            bmi: null,
            hbp: null
        };
        dynamicInfoRef.push(dynamicInfoSession);
    }

    updateParticipant(participant){
        console.log(participant)
        let updates = {}
        updates['/staticParticipantInfo/'+participant.key] = participant
        firebase.database().ref('staticParticipantInfo').child(participant.key).set(participant,()=>{console.log("Done Updating")})
        // firebase.database().ref('staticParticipantInfo').set({[participant.key] : participant})
    }

    render(){

        const { classes } = this.props;
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                        <Button color="primary" onClick={this.newParticipant}>New Participant</Button>
                    </GridItem>
                    {this.state.participants.map((participant, i) => {
                        return (<GridItem xs={12} sm={12} md={8}>
                            <Card>
                                <CardHeader color="primary">
                                    {/*<h4 className={classes.cardTitleWhite}>{participant.name}</h4>*/}
                                    <TextField
                                        label="Name"
                                        id="standard-name"
                                        value={participant.name}
                                        className={classes.textField}

                                        // onChange = {(e)=>{console.log(e.target.value)}}
                                        onChange={(e)=>this.setState({participants: update(this.state.participants, {[i]: {name: {$set: e.target.value}}})})}

                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </CardHeader>
                                <CardBody>
                                   
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={5}>
                                            <TextField
                                                id="standard-name"
                                                label="Age"
                                                value={participant.age}
                                                className={classes.textField}
                                                onChange={(e)=>this.setState({participants: update(this.state.participants, {[i]: {age: {$set: e.target.value}}})})}
                                                margin="normal"
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={5}>
                                            <TextField
                                                id="standard-name"
                                                label="Gender"
                                                value={participant.gender}
                                                className={classes.textField}
                                                onChange={(e)=>this.setState({participants: update(this.state.participants, {[i]: {gender: {$set: e.target.value}}})})}
                                                margin="normal"
                                            />
                                        </GridItem>
                                    </GridContainer>

                                      <GridContainer>
                                        <GridItem xs={12} sm={12} md={5}>
                                            <TextField
                                                id="standard-name"
                                                label="Marital Status"
                                                value={participant.marital}
                                                className={classes.textField}
                                                onChange={(e)=>this.setState({participants: update(this.state.participants, {[i]: {marital: {$set: e.target.value}}})})}
                                                margin="normal"
                                            />
                                        </GridItem>
                                          <GridItem xs={12} sm={12} md={5}>
                                              <TextField
                                                  id="standard-name"
                                                  label="Duration of Pain"
                                                  value={participant.painDur}
                                                  className={classes.textField}
                                                  onChange={(e)=>this.setState({participants: update(this.state.participants, {[i]: {painDur: {$set: e.target.value}}})})}
                                                  margin="normal"
                                              />
                                          </GridItem>
                                    </GridContainer>
                                      <GridContainer>
                                          <GridItem xs={12} sm={12} md={5}>
                                            <TextField
                                                id="standard-name"
                                                label="Race/Ethnicity"
                                                value={participant.race}
                                                className={classes.textField}
                                                onChange={(e)=>this.setState({participants: update(this.state.participants, {[i]: {race: {$set: e.target.value}}})})}
                                                margin="normal"
                                            />
                                        </GridItem>
                                          <GridItem xs={12} sm={12} md={5}>
                                              <TextField
                                                  id="standard-read-only-input"
                                                  label="ID - Read Only"
                                                  value={participant.id}
                                                  className={classes.textField}
                                                  margin="normal"
                                              />
                                          </GridItem>
                                    </GridContainer>

                                </CardBody>
                                <CardFooter>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <Button  margin="normal" color="primary" onClick={()=>{this.updateParticipant(participant)}}>Update Participant</Button>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <Button   margin="normal" onClick={()=>{firebase.database().ref('staticParticipantInfo').child(participant.key).remove()}} color="warning">Delete Participant</Button>
                                        </GridItem>
                                    </GridContainer>
                                </CardFooter>

                            </Card>
                        </GridItem>
                    )})}
                    {/*<GridItem xs={12} sm={12} md={4}>*/}
                    {/*<Card profile>*/}
                    {/*<CardAvatar profile>*/}
                    {/*<a href="#pablo" onClick={e => e.preventDefault()}>*/}
                    {/*<img src={avatar} alt="..." />*/}
                    {/*</a>*/}
                    {/*</CardAvatar>*/}
                    {/*<CardBody profile>*/}
                    {/*<h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>*/}
                    {/*<h4 className={classes.cardTitle}>Alec Thompson</h4>*/}
                    {/*<p className={classes.description}>*/}
                    {/*Don't be scared of the truth because we need to restart the*/}
                    {/*human foundation in truth And I love you like Kanye loves Kanye*/}
                    {/*I love Rick Owens’ bed design but the back is...*/}
                    {/*</p>*/}
                    {/*<Button color="primary" round>*/}
                    {/*Follow*/}
                    {/*</Button>*/}
                    {/*</CardBody>*/}
                    {/*</Card>*/}
                    {/*</GridItem>*/}
                </GridContainer>
            </div>
        );
    }
}


UserProfile.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserProfile);
