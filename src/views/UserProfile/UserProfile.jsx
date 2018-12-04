import React from "react";
import PropTypes from "prop-types";
import update from 'immutability-helper';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
import {confirmAlert} from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
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
  },
    nameHeader:{
      textColor: "#FFFFFF",
      color: "#FFFFFF",
      stroke: "#FFFFFF"
    },

    formBody:{
        display: 'flex',
        "flex-direction": 'colum',
        flex: 1
    },

    formRow:{
      display: 'flex',
        "flex-direction": 'row',
        flex: 1
    },

    formElement:{
        margin: 10,
        width: 250

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
                    race: items[item].race,
                    groups: items[item].groups
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
            groups: "",
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

    deleteParticipant = (key) => {
        confirmAlert({
            title: 'Confirm Deletion',
            message: 'The participant will be permanently deleted',
            buttons: [
                {
                    label: 'Delete',
                    onClick: () => firebase.database().ref('staticParticipantInfo').child(key).remove()
                },
                {
                    label: 'Cancel',
                    onClick: () => {}
                }
            ]
        })
    };

    render(){

        const { classes } = this.props;
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                        <Button color="primary" onClick={this.newParticipant}>New Participant</Button>
                    </GridItem>

                    {this.state.participants.map((participant, i) => {
                        return (<GridItem xs={12} sm={8} md={8}>
                            <Card>
                                <CardHeader color="primary">
                                    {/*<h4 className={classes.cardTitleWhite}>{participant.name}</h4>*/}
                                    <TextField
                                        label="Name"
                                        id="standard-name"
                                        value={participant.name}
                                        className={classes.textField}
                                        inputProps={{
                                            className: classes.cardTitleWhite
                                        }}
                                        InputLabelProps={{
                                            className: classes.cardTitleWhite
                                        }}
                                        onChange={(e)=>this.setState({participants: update(this.state.participants, {[i]: {name: {$set: e.target.value}}})})}

                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </CardHeader>
                                <CardBody>
                                    <div style = {styles.formRow}>
                                            <TextField
                                                style={styles.formElement}
                                                id="standard-number"
                                                type = "number"
                                                label="Age (Years)"
                                                value={participant.age}
                                                className={classes.textField}
                                                onChange={(e)=>this.setState({participants: update(this.state.participants, {[i]: {age: {$set: e.target.value}}})})}
                                            />
                                            <TextField
                                                style={styles.formElement}
                                                id="standard-name"
                                                label="Gender"
                                                value={participant.gender}
                                                className={classes.textField}
                                                onChange={(e)=>this.setState({participants: update(this.state.participants, {[i]: {gender: {$set: e.target.value}}})})}
                                            />
                                    </div>

                                    <div style = {styles.formRow}>
                                        <FormControl style={styles.formElement} margin= "normal" >
                                            <InputLabel>Marital Status</InputLabel>
                                            <Select
                                                value={participant.marital}
                                                onChange={(e)=>this.setState({participants: update(this.state.participants, {[i]: {marital: {$set: e.target.value}}})})}
                                                inputProps={{
                                                    id: "standard-name",
                                                }}
                                            >
                                                <MenuItem value = "Unspecified">Unspecified</MenuItem>
                                                <MenuItem value = "Married">Married</MenuItem>
                                                <MenuItem value = "Unmarried">Unmarried</MenuItem>
                                            </Select>
                                        </FormControl>
                                          <TextField
                                              style={styles.formElement}
                                              id="standard-name"
                                              label="Months of Pain"
                                              value={participant.painDur}
                                              type = "number"
                                              onChange={(e)=>this.setState({participants: update(this.state.participants, {[i]: {painDur: {$set: e.target.value}}})})}
                                              margin="normal"
                                          />
                                    </div>

                                    <div style = {styles.formRow}>
                                        <FormControl style={styles.formElement} margin= "normal" >
                                            <InputLabel>Race/Ethnicity</InputLabel>
                                            <Select
                                                value={participant.race}
                                                onChange={(e)=>this.setState({participants: update(this.state.participants, {[i]: {race: {$set: e.target.value}}})})}
                                                inputProps={{
                                                    id: "standard-name",
                                                }}
                                            >
                                                <MenuItem value = "White">White</MenuItem>
                                                <MenuItem value = "Black">Black or African American</MenuItem>
                                                <MenuItem value = "Asian">Asian</MenuItem>
                                                <MenuItem value = "Other">Other</MenuItem>
                                            </Select>
                                        </FormControl>
                                              <TextField
                                                  style={styles.formElement}
                                                  id="standard-read-only-input"
                                                  label="ID - Read Only"
                                                  value={participant.id}
                                                  className={classes.textField}
                                                  margin="normal"
                                              />

                                            <TextField
                                                style={styles.formElement}
                                                id="standard-name"
                                                label="Group"
                                                value={participant.groups}
                                                className={classes.textField}
                                                onChange={(e)=>this.setState({participants: update(this.state.participants, {[i]: {groups: {$set: e.target.value}}})})}
                                                margin="normal"
                                            />
                                      </div>

                                </CardBody>
                                <CardFooter>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <Button  margin="normal" color="primary" onClick={()=>{this.updateParticipant(participant)}}>Update Participant</Button>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <Button margin="normal" onClick={()=>{this.deleteParticipant(participant.key)}} color="warning">Delete Participant</Button>
                                        </GridItem>

                                    </GridContainer>
                                </CardFooter>

                            </Card>
                        </GridItem>
                    )})}
                </GridContainer>
            </div>
        );
    }
}


UserProfile.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserProfile);
