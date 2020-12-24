var db = firebase.firestore();
const username = document.getElementById('username');
const contact = document.getElementById('contact');
const address = document.getElementById('address');
const amount = document.getElementById('amount');
const carModel = document.getElementById('carModel');
const carName = document.getElementById('carName');
const carNumber = document.getElementById('carNumber');
const timestamp = document.getElementById('timestamp');
const date = document.getElementById('date');
const transactionId = document.getElementById('transactionId');


var serialValue = document.getElementById('serial').value;
console.log(serialValue);
db.collection("portal").onSnapshot(function (querySnapshot) {
    querySnapshot.docChanges().forEach(function(change) {
        
        if (change.type === "added") {
            document.getElementById('serial').innerHTML = serialValue + "<br/><br/>"
            username.innerHTML += change.doc.data().name + "<br/><br/>"
            contact.innerHTML += change.doc.data().contact + "<br/><br/>"
            address.innerHTML += change.doc.data().address + "<br/><br/>"
            amount.innerHTML += change.doc.data().amount / 100 + "<br/><br/>"
            carModel.innerHTML += change.doc.data().carModel + "<br/><br/>"
            carName.innerHTML += change.doc.data().carName + "<br/><br/>"
            carNumber.innerHTML += change.doc.data().carNumber + "<br/><br/>"
            success.innerHTML += change.doc.data().success + "<br><br/>"
            console.log(change.doc.data().success);
            if (change.doc.data().success === "true") {
                success.style.color = 'red';
            }
            date.innerHTML += change.doc.data().timestamp.toDate().toLocaleDateString() + "<br/><br/>"
            timestamp.innerHTML += change.doc.data().timestamp.toDate().toLocaleTimeString() + "<br/><br/>"
            transactionId.innerHTML += change.doc.data().transactionId + "<br/><br/>"
            serialValue += 1;
        }
    });
});

