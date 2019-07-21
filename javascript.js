// Initialize Firebase

var firebaseConfig = {
    apiKey: "AIzaSyCL8FkXIl6pTfzeEaTyoAK8fp3uFj5JtJg",
    authDomain: "my-awesome-project-5fa66.firebaseapp.com",
    databaseURL: "https://my-awesome-project-5fa66.firebaseio.com",
    projectId: "my-awesome-project-5fa66",
    storageBucket: "my-awesome-project-5fa66.appspot.com",
    messagingSenderId: "1089103010651",
    appId: "1:1089103010651:web:0377a6a0bdc1e7c6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create a variable to reference the database
db = firebase.database();

var train = "",
destination = "", 
time = "",
frequency = "",
placeHolder = "Coming Soon!"

$("#time").keyup(function() {
    let inp = $(this).val()
    let re = new RegExp("^([0-1][0-9]|2[0-3]):([0-5][0-9])$")
    if (re.test(inp)) {
        $("#time").removeAttr("style")
        $("#myButton").removeAttr("disabled")
        console.log("Happy Path")
    }
    else {
        $("#time").attr("style", "border: 2px solid red;")
        $("#myButton").attr("disabled", "disabled")
    }
})

$("#myButton").click(function(event) {
    event.preventDefault();

    train = $("#train").val().trim();
    destination = $("#destination").val().trim();
    time = $("#time").val().trim();
    frequency = $("#frequency").val().trim();

    db.ref("/train").push({
        Train: train,
        Destination : destination,
        Start : time,
        Frequency : frequency 
    })
})

db.ref("/train").on("child_added", function(snapshot) {    
    let a = moment()
    let b = snapshot.val().Start.split(":")
    let c = moment().hour(b[0]).minute(b[1])
    let totalMinutes = ""
    , trainsPassed = ""
    , minutesRemaining = ""
    , minutesShow = ""
    , dateShow = ""

    if (a >= c) {
        totalMinutes = a.diff(c, "minutes")
        trainsPassed = Math.floor(totalMinutes/parseInt(snapshot.val().Frequency))
        minutesRemaining = totalMinutes - (trainsPassed * parseInt(snapshot.val().Frequency))
        minutesShow = parseInt(snapshot.val().Frequency) - minutesRemaining 
        dateShow = a.add(minutesShow, "m").format("H:mm A").replace(/N/g, "P").replace(/V/g, "A")
        console.log(dateShow)
    }

    else {
        minutesShow = c.diff(a, "minutes")
        if (parseInt(b[0]) >= 12) {
            dateShow = snapshot.val().Start + " PM"
        }
        else {
            dateShow = snapshot.val().Start + " AM"
        }
    }
    
    $("#table").append(`<tr>
                            <td>${snapshot.val().Train}</td>
                            <td>${snapshot.val().Destination}</td>
                            <td>${snapshot.val().Frequency}</td>                            
                            <td>${dateShow}</td>
                            <td>${minutesShow}</td>                                   
                        </tr>`) 

})  
