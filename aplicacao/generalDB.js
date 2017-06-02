function getKey(id, store, getFunc) {
    var transaction = db.transaction([store], "readwrite");
    var objectStore = transaction.objectStore(store);
    requestDB = objectStore.get(id);
    requestDB.onerror = function (event) {
        alert("Unable to retrieve data from database!");
    };
    requestDB.onsuccess = function (event) {
        if (requestDB.result) {
            getFunc(requestDB.result);
        } else {
            console.log("Kenny couldn't be found in your database!");
        }
    };
}


function addKey(id, store, lista, getFunc) {
    var transaction = db.transaction([store], "readwrite");
    var objectStore = transaction.objectStore(store);
    requestDB = objectStore.get(id);
    requestDB.onerror = function (event) {
        alert("Unable to retrieve data from database!");
    };
    requestDB.onsuccess = function (event) {
        if (requestDB.result) {
            getFunc(requestDB.result, lista);
        } else {
            console.log("Kenny couldn't be found in your database!");
        }
    };
}
