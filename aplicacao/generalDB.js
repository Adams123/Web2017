//procura na store definida um objeto com a id e aplica a função getFunc sobre o objeto (como update ou delete)
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
            console.log("Não foi possível encontrar o produto.");
        }
    };
}


function listAllItems(storeName, table, showFunc) {
    var trans = db.transaction(storeName, IDBTransaction.READ_ONLY);
    var store = trans.objectStore(storeName);
    var items = [];
    var id = store.keyPath;
    trans.oncomplete = function (evt) {};

    var cursorRequest = store.openCursor();

    cursorRequest.onerror = function (error) {
        console.log(error);
    };

    cursorRequest.onsuccess = function (evt) {
        var cursor = evt.target.result;
        if (cursor) {
            items.push(cursor.value);
            cursor.continue();
        } else {
            var len = items.length;
            for (var j = 0; j < len; j++) { //evita ficar readicionando html toda vez q abrir a aba
                    showFunc(items[j]);
            }
        }
    };
}
