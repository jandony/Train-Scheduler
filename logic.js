// hard code train Name, Role, Start Date, Monthly Rate
// type Months Worked
// calculate Total Billed ($)

// use .push()

// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)
var firebaseConfig = {
    apiKey: "AIzaSyAh9BlTMdS0T5-Zz3uASug7UksA_BE-blc",
    authDomain: "my-first-project-ef3f7.firebaseapp.com",
    databaseURL: "https://my-first-project-ef3f7.firebaseio.com",
    projectId: "my-first-project-ef3f7",
    storageBucket: "my-first-project-ef3f7.appspot.com",
    messagingSenderId: "682978242253",
    appId: "1:682978242253:web:b1a9f37ca07a5ee2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Create a variable to reference the database.
var database = firebase.database();

// --------------------------------------------------------------
// Initial Values

// --------------------------------------------------------------
// On submit button click function

$("#train-submit").on("click", function () {
    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#train-destination").val().trim();
    var trainFrequency = $("#train-frequency").val().trim();
    
    // var trainArrival;
    // var trainMinutesAway;

    // Save the new train information in Firebase
    database.ref().push({
        trainName: trainName,
        trainDestination: trainDestination,
        trainFrequency: trainFrequency
    });

    $("input").val("");

});

// --------------------------------------------------------------
// At the page load and subsequent value changes, get a snapshot of the local data.

database.ref().on("child_added", function (childSnapshot) {

    $("tbody").append("<tr>" + "<th scope='col'> " + childSnapshot.val().trainName + 
    "<td scope='col'>" + childSnapshot.val().trainDestination + 
    "<td scope='col'>" + childSnapshot.val().trainFrequency +
    "<td scope='col'>" + childSnapshot.val().trainArrival +
    "<td scope='col'>" + childSnapshot.val().trainMinutesAway);

    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------