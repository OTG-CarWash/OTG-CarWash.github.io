var db = firebase.firestore();
const username = document.getElementById('username');
const contact = document.getElementById('contact');
const address = document.getElementById('address');
const amount = document.getElementById('amount');
const carModel = document.getElementById('carModel');
const carName = document.getElementById('carName');
const carNumber = document.getElementById('carNumber');
const success = document.getElementById('success');
const timestamp = document.getElementById('timestamp');
const date = document.getElementById('date');
const transactionId = document.getElementById('transactionId')

db.collection("portal").onSnapshot(function (querySnapshot) {
    querySnapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
            username.innerHTML += change.doc.data().name + "<br/>"
            contact.innerHTML += change.doc.data().contact + "<br/>"
            address.innerHTML += change.doc.data().address + "<br/>"
            amount.innerHTML += change.doc.data().amount/100 + "<br/>"
            carModel.innerHTML += change.doc.data().carModel + "<br/>"
            carName.innerHTML += change.doc.data().carName + "<br/>"
            carNumber.innerHTML += change.doc.data().carNumber + "<br/>"
            success.innerHTML += change.doc.data().success + "<br/>"
            date.innerHTML += change.doc.data().timestamp.toDate().toLocaleDateString() + "<br/>";
            timestamp.innerHTML += change.doc.data().timestamp.toDate().toLocaleTimeString() + "<br/>"
            transactionId.innerHTML += change.doc.data().transactionId + "<br/>"
        }
    });
});



// db.collection("transcations").doc('qxFHBEinHAToiLEloeVd').collection("allTranscation").get()
//     .then(querySnapshot => {
//         querySnapshot.forEach(doc => {
//             console.log(doc.id, " => ", doc.data());
//         });
//     });



// function namecaller() {
//     var email = document.getElementById("name").value;
//     var name = document.getElementById("email").value;
//     var success = "true";
// Add a new document in collection "cities"
//     db.collection("cities").doc().set({
//             name: name,
//             email: email,
//             success: success
//         })
//         .then(function () {
//             console.log("Document successfully written!");
//         })
//         .catch(function (error) {
//             console.error("Error writing document: ", error);
//         });
// }