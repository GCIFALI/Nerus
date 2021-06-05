const firebase = require("firebase");
let config = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};
firebase.initializeApp(config);
module.exports = firebase.database();