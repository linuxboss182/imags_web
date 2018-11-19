import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
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

    }

    componentDidMount(){
        //Load data
        const ParticipantRef = firebase.database().ref('staticParticipantInfo');
        ParticipantRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    age: items[item].age,
                    gender: items[item].gender,
                    marital: items[item].marital,
                    name: items[item].name,
                    painDur: items[item].painDur,
                    race: items[item].race,
                    num: item
                });
            }
            this.setState({
                participants: newState
            });
        });
    }

    render(){

        const { classes } = this.props;
        return (
            <div>
                <GridContainer>
                    {this.state.participants.map((participant, i) => {
                        return (<GridItem xs={12} sm={12} md={8}>
                            <Card>
                                <CardHeader color="primary">
                                    <h4 className={classes.cardTitleWhite}>{participant.name}</h4>
                                </CardHeader>
                                <CardBody>
                                   
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={5}>
                                            Age:
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                            {participant.age}
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={5}>
                                            Gender:
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                            {participant.gender}
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={5}>
                                            Marital Status:
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                            {participant.marital}
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={5}>
                                            Duration of Pain:
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                            {participant.painDur}
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={5}>
                                            Race/Ethnicity:
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                            {participant.race}
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                                <CardFooter>
                                    <Button color="primary">Update Profile</Button>
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
