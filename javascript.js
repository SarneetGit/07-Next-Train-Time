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
    $("#table").append(`<tr>
                            <td>${snapshot.val().Train}</td>
                            <td>${snapshot.val().Destination}</td>
                            <td>${snapshot.val().Start}</td>                            
                            <td>${snapshot.val().Frequency}</td>
                            <td>${placeHolder}</td>                                   
                        </tr>`)    
})