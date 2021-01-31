var db = firebase.firestore();
var query = db.collection("portal").orderBy("timestamp", "desc");
const table = document.getElementById('data');

query.onSnapshot(function (querySnapshot) {
    querySnapshot.docChanges().forEach(function (change) {
        var orderId = change.doc.data().orderId;
        var docId = change.doc.data().docId;
        var timestamp = change.doc.data().timestamp;
        var amount = change.doc.data().amount;
        var contact = change.doc.data().contact;
        var username = change.doc.data().name;
        var status = change.doc.data().success
        var assignedTo = change.doc.data().assignTo;
        if (change.type === "added") {
            

            if (status === false) {
                status = "× Payment Failed";
                db.collection("portal").doc(docId).update({
                        assignTo: "Payment Failed"
                    })
                    .then(function () {
                        console.log("Document successfully written!");
                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    });
            } else {
                status = "️✔ PAID";
            }
            table.innerHTML += "<tr><td id='order-id'>" + orderId + "</td>" +
                `<td> ${username}</td>` +
                "<td>" + contact + "</td>" +
                "<td>" + amount / 100 + "</td>" +
                "<td>" + timestamp.toDate().toLocaleDateString() + "</td>" +
                `<td><div class="btn btn-dark" id='myBtn' onclick="display_receipt('${docId}')">🧾</div></td>` +
                `<td id="assignedCell">${assignedTo}</td>` +
                `<td id="statusPay">${status}</td></tr>`;
        }
    });
});


function display_receipt(userId) {
    console.log(userId);
    // Get the modal
    var modal = document.getElementById("receipt-modal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close-modal")[0];

    // When the user clicks the button, open the modal 
    modal.style.display = "block";

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
    
    db.collection("portal").where("docId", "==", userId)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                document.getElementById('modal-orderid').innerHTML = "Invoice details - Order #" + doc.data().orderId;
                document.getElementById('order-date').innerHTML = doc.data().timestamp.toDate().toLocaleDateString();
                document.getElementById('order-time').innerHTML = doc.data().timestamp.toDate().toLocaleTimeString();
                if (doc.data().success === true) {
                    document.getElementById('order-status').innerHTML = "PAID";
                } else {
                    document.getElementById('order-status').innerHTML = "&times;";
                }

                document.getElementById('order-name').innerHTML = doc.data().name;
                document.getElementById('order-id').innerHTML = doc.data().orderId;
                document.getElementById('order-carName').innerHTML = doc.data().carName;
                document.getElementById('order-contact').innerHTML = doc.data().contact;
                document.getElementById('order-address').innerHTML = doc.data().address;
                document.getElementById('order-pinCode').innerHTML = doc.data().pinCode;
                document.getElementById('order-carModel').innerHTML = doc.data().carModel;
                document.getElementById('order-carNumber').innerHTML = doc.data().carNumber;
                document.getElementById('order-amount').innerHTML = doc.data().amount / 100;
                document.getElementById('order-transactionId').innerHTML = doc.data().transactionId;
                
                
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
    
        var btn2 = document.getElementById("myBtn2");
        btn2.onclick = function() {
            openModal(userId);
        }

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



function openModal(id) {
    var modal = document.getElementById("assign-modal");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close-assignModal")[0];

    var saveChanges = document.getElementsByClassName("close-saveChanges")[0];
    // When the user clicks the button, open the modal 
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    var btn = document.getElementById('assigning-button');
    btn.onclick = function() {
        var nameAssigned = document.getElementById('assign-input').value;
        console.log(nameAssigned);
        db.collection("portal").doc(id).update({
                assignTo: nameAssigned
            })
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
        console.log("Assigned");
        btn.innerHTML = "Success";
        btn.className = "btn btn-success"
    }
    

    saveChanges.onclick = function () {
        modal.style.display = "none";
        location.reload();
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function cancel() {
    var order = window.prompt("Enter the Order ID");
    db.collection("portal").where("orderId", "==", order).get().then(function(querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var docid = doc.data().docId;
            var uid = doc.data().uid;
            db.collection("portal").doc(docid).update({
                cancelled: true,
            });
            db.collection("transactions").doc(uid).collection("allTransaction").doc(docid).update({
                cancelled: true,
            }).then(function () {
                console.log("cancelled");
            }).catch(function(error) {
                console.error("Error in cancelling in transaction");
            });
        });
    }).catch(function(error){
        console.error("error in cancelling in portal");
    })  
}