// hard code Employee Name, Role, Start Date, Monthly Rate
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

$("#employee-submit").on("click", function () {
    event.preventDefault();

    var employeeName = $("#employee-name").val().trim();
    var employeeRole = $("#employee-role").val().trim();
    var employeeStartDate = moment($("#employee-startdate").val().trimt()).format('l');
    var employeeMonthlyRate = $("#employee-monthlyrate").val().trim();

    var monthsWorked = moment().diff(employeeStartDate, 'months');
    var totalBilled = employeeMonthlyRate * monthsWorked; 

    // Save the new employee information in Firebase
    database.ref().push({
        employeeName: employeeName,
        employeeRole: employeeRole,
        employeeStartDate: employeeStartDate,
        employeeMonthsWorked: monthsWorked,
        employeeMonthlyRate: employeeMonthlyRate,
        employeeTotalBilled: totalBilled
    });

    $("input").val("");

});

// --------------------------------------------------------------
// At the page load and subsequent value changes, get a snapshot of the local data.

database.ref().on("child_added", function (childSnapshot) {

    $("tbody").append("<tr>" + "<th scope='col'> " + childSnapshot.val().employeeName + "<td scope='col'>" + childSnapshot.val().employeeRole + "<td scope='col'>" + childSnapshot.val().employeeStartDate + "<td scope='col'>" + childSnapshot.val().employeeMonthsWorked + " month(s)" + "<td scope='col'>" + childSnapshot.val().employeeMonthlyRate + "<td scope='col'>$ " + childSnapshot.val().employeeTotalBilled)

    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------