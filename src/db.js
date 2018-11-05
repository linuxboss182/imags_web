import React, { Component } from 'react';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCnHVVLJxdGOrXpjCDoprt5m9e8pFFcAw8",
    authDomain: "imags-web.firebaseapp.com",
    databaseURL: "https://imags-web.firebaseio.com",
    projectId: "imags-web",
    storageBucket: "imags-web.appspot.com",
    messagingSenderId: "780664887786"
};

firebase.initializeApp(config);
export default firebase;