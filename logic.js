// hard code train Name, Role, Start Date, Monthly Rate
// type Months Worked
// calculate Total Billed ($)

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
    var trainFirstTime = $("#train-time").val().trim();
    var trainFrequency = $("#train-frequency").val().trim();

    console.log("First Train Time: " + trainFirstTime);

    
    // converting First Train Time to happen 1 year in the past
    var firstTimeConverted = moment(trainFirstTime, "HH:mm").subtract(1, "years");
    console.log("First Time Converted: " + firstTimeConverted);
    // setting a variable for the difference between current time and the time in the past
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("diffTime: " + diffTime);
    // setting the remaining time in a variable
    var tRemainder = diffTime % trainFrequency;
    console.log("tRemainder: " + tRemainder);
    var minTilTrain = trainFrequency - tRemainder;
    console.log("minTilTrain: " + minTilTrain);
    
    var trainMinutesAway = minTilTrain;
    var trainArrival = moment().add(minTilTrain, 'mm').format("HH:mm");
    console.log("trainArrival " + trainArrival);

    // Save the new train information in Firebase
    database.ref().push({
        name: trainName,
        destination: trainDestination,
        frequency: trainFrequency,
        minutesAway: trainMinutesAway,
        arrival: trainArrival
    });

    $("input").val("");

});

// --------------------------------------------------------------
// At the page load and subsequent value changes, get a snapshot of the local data.

database.ref().on("child_added", function (childSnapshot) {

    $("tbody").append("<tr>" + "<th scope='col'> " + childSnapshot.val().name +
        "<td scope='col'>" + childSnapshot.val().destination +
        "<td scope='col'>" + childSnapshot.val().frequency +
        "<td scope='col'>" + childSnapshot.val().arrival +
        "<td scope='col'>" + childSnapshot.val().minutesAway);

    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------