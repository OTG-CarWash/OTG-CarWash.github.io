var db = firebase.firestore();
var query = db.collection("portal");
var dates = db.collection("ending-dates").orderBy("endingDate", "desc");
const dateTable = document.getElementById('dates');

query.onSnapshot(function (querySnapshot) {
    querySnapshot.docChanges().forEach(function (change) {

        if (change.type === "added") {
            var orderId = change.doc.data().orderId;
            var docId = change.doc.data().docId;
            var timestamp = change.doc.data().timestamp;
            var amount = change.doc.data().amount;
            var ending_date = setEndingDate(timestamp, amount);

            var cityRef = db.collection('ending-dates').doc(docId);

            var setWithMerge = cityRef.set({
                endingDate: ending_date,
                docId: docId,
                orderId: orderId
            });
        }
    });
});


const array = [];
dates.onSnapshot(function (querySnapshot) {
    querySnapshot.docChanges().forEach(function (change) {

        if (change.type === "added") {
            var end = change.doc.data().endingDate;
            var id = change.doc.data().docId;
            var obj = {
                end: end,
                id : id
            }
            array.push(obj);
        }
    });
    array.sort(function (a, b) {
        a.end - b.end
    });
    // console.log(array);
    for (let index = array.length - 1; index >= 0; index--) {
        const obj = array[index];
        fetch(obj.end, obj.id);
    }
});

function fetch(d, id) {
    db.collection("portal").where("docId", "==", id)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var orderId = doc.data().orderId;
                var docId = doc.data().docId;
                var timestamp = doc.data().timestamp;
                var amount = doc.data().amount;
                var contact = doc.data().contact;
                var username = doc.data().name;

                var assignedTo = doc.data().assignTo;
                dateTable.style.verticalAlign = "center";
                dateTable.innerHTML += "<tr><td id='order-id'>" + orderId + "</td>" +
                    "<td>" + username + "</td>" +
                    "<td>" + contact + "</td>" +
                    "<td>" + amount / 100 + "</td>" +
                    "<td>" + timestamp.toDate().toLocaleDateString() + "</td>" +
                    "<td>" + d.toDate().toLocaleDateString() + "</td>" +
                    `<td><button class="btn btn-dark" id='myBtn' onclick="display_receipt('${docId}')">view & assign</button></td>` +
                    `<td id="assignedCell">${assignedTo}</td></tr>`;
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}

function setEndingDate(timestamp, amount) {
    var date = timestamp.toDate();
    var n = 0;
    amount = amount/100;
    if (amount === 100) {
        n = 0;
    } else if (amount === 600) {
        n = 1;
    } else if (amount === 1600) {
        n = 4;
    } else if (amount === 3400) {
        n = 6;
    } else if (amount === 6800) {
        n = 12;
    }

    var d = new Date(date);
    d.setMonth(d.getMonth() + 12);
    return d;
}























