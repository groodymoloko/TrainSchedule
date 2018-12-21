// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyD4szo3KFEsxaXuCbHYXmL7zT4xDcDfHEQ",
    authDomain: "traintime-1.firebaseapp.com",
    databaseURL: "https://traintime-1.firebaseio.com",
    projectId: "traintime-1",
    storageBucket: "traintime-1.appspot.com",
    messagingSenderId: "256129009928"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding a train
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#train-destination-input").val().trim();
    var trainFirst = $("#train-first-input").val().trim();
    var trainFrequency = $("#train-frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      first: trainFirst,
      frequency: trainFrequency
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#train-destination-input").val("");
    $("#train-first-input").val("");
    $("#train-frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
  
    // Store each captured user input into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().first;
    var trainFrequency = childSnapshot.val().frequency;
  
    // Log train info
    // console.log("Name: " + trainName);
    // console.log("Dest: " + trainDestination);
    console.log("First: " + trainFirst);
    // console.log("Freq: " + trainFrequency);
  
    //Figuring out next arrival and minutes until next train from user input

      // Calculate how many minutes away the next train is by compaing next arrival time with the current time
      var trainFirstConverted = moment(trainFirst, "HH:mm").subtract(1, "years");
      console.log("FirstConverted: " + trainFirstConverted);

      //Difference between the current time and first train
      var diffTime = moment().diff(moment(trainFirstConverted), "minutes")

      // Minutes apart from current time and the last train
      var trainTimeRemainder = diffTime % trainFrequency;

      //Minutes until the next train
      var trainMinToNext = trainFrequency - trainTimeRemainder;

      //Time of next train arrival
      var trainNext = moment().add(trainMinToNext, "minutes").format("hh:mm A");
      
    // // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(trainNext),
      $("<td>").text(trainMinToNext),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  