var db = firebase.firestore();
// var currentDate = Date.now();
// const table = document.getElementById('data');

// var dates = new Set();
// var button = document.getElementById('current_date');
// db.collection("portal").get().then(function (querySnapshot) {
//     querySnapshot.forEach(function (doc) {
//         currentDate = doc.data().timestamp.toDate().toLocaleDateString();
//         if (!dates.has(currentDate)) {
//             dates.add(currentDate);
//             button.innerHTML += "<button onclick='' class='btn btn primary'>" + currentDate + "</button> <br/>";
//         }
//     });
// }).catch(function (error) {
//     console.log("Error getting document:", error);
// });

var query = db.collection("portal");
const table = document.getElementById('data');

// const orderPlaced = document.getElementById('orderPlaced');
query.onSnapshot(function (querySnapshot) {
    querySnapshot.docChanges().forEach(function (change) {
        var orderId = change.doc.data().orderId;
        var amount = change.doc.data().amount;
        var orderId = change.doc.data().orderId;
        var contact = change.doc.data().contact;
        var address = change.doc.data().address;
        var carName = change.doc.data().carName;
        var success = change.doc.data().success;
        var carModel = change.doc.data().carModel;
        var username = change.doc.data().name;
        var carNumber = change.doc.data().carNumber;
        var timestamp = change.doc.data().timestamp;
        var transactionId = change.doc.data().transactionId;

        if (change.type === "added") {
            table.innerHTML += "<tr><td>" + orderId + "</td>" +
                "<td>" + username + "</td>" +
                "<td>" + contact + "</td>" +
                "<td>" + address + "</td>" +
                "<td>" + amount / 100 + "</td>" +
                "<td>" + carName + "</td>" +
                "<td>" + carModel + "</td>" +
                "<td>" + carNumber + "</td>" +
                "<td>" + timestamp.toDate().toLocaleDateString() + "</td>" +
                "<td>" + timestamp.toDate().toLocaleTimeString() + "</td>" +
                "<td>" + transactionId + "</td>" +
                "<td id='status__id'><status>" + success + "</status></td></tr>";
        }
        // orderPlaced.innerHTML += change.doc.data().timestamp.toDate().toLocaleDateString() + "<br/>";
    });
});


