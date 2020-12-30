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
        var contact = change.doc.data().contact;
        var username = change.doc.data().name;
        var timestamp = change.doc.data().timestamp;

        if (change.type === "added") {
            table.innerHTML += "<tr><td>" + orderId + "</td>" +
                "<td>" + username + "</td>" +
                "<td>" + contact + "</td>" +
                "<td>" + amount / 100 + "</td>" +
                "<td>" + timestamp.toDate().toLocaleDateString() + "</td>" +
                `<td><button class="btn btn-dark" id='myBtn' onclick="on('${orderId}')">view</button></td></tr>`;
        }
    });
});


function on(userId) {
    console.log(userId);
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close-modal")[0];

    // When the user clicks the button, open the modal 
    modal.style.display = "block";
    
    db.collection("portal").where("orderId", "==", userId)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                document.getElementById('modal-orderid').innerHTML = "Invoice details - Order #" + userId;
                document.getElementById('order-date').innerHTML = doc.data().timestamp.toDate().toLocaleDateString();
                
                if (doc.data().success === true) {
                    document.getElementById('order-status').innerHTML = "PAID";
                    document.getElementById('order-status').className = "btn btn-success";
                } else {
                    document.getElementById('order-status').innerHTML = "&times;";
                    document.getElementById('order-status').className = "btn btn-danger";
                }

                document.getElementById('order-name').innerHTML = doc.data().name;
                document.getElementById('order-contact').innerHTML = doc.data().contact;
                document.getElementById('order-address').innerHTML = doc.data().address;
                document.getElementById('order-pinCode').innerHTML = doc.data().pinCode;
                document.getElementById('order-amount').innerHTML = doc.data().amount/100;
                document.getElementById('order-time').innerHTML = doc.data().timestamp.toDate().toLocaleTimeString();
                document.getElementById('order-carName').innerHTML = doc.data().carName;
                document.getElementById('order-carModel').innerHTML = doc.data().carModel;
                document.getElementById('order-carNumber').innerHTML = doc.data().carNumber;
                document.getElementById('order-transactionId').innerHTML = doc.data().transactionId;
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });


    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}