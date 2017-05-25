//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

const adminData = [
  { id: "0", name: "admin", pass: "admin"}
];


var db;
var request = window.indexedDB.open("AdminDB", 1);

request.onerror = function(event) {
  console.log("error: ");
};

request.onsuccess = function(event) {
  db = request.result;
  console.log("success: "+ db);
};

request.onupgradeneeded = function(event) {
        var db = event.target.result;
        var objectStore = db.createObjectStore("admins", {keyPath: "id"});
        for (var i in adminData) {
                objectStore.add(adminData[i]);
        }
}

function read() {
        var transaction = db.transaction(["admins"]);
        var objectStore = transaction.objectStore("admins");
        var request = objectStore.get("0");
        request.onerror = function(event) {
          alert("Unable to retrieve daa from database!");
        };
        request.onsuccess = function(event) {
          // Do something with the request.result!
          if(request.result) {
                alert("Name: " + request.result.name + ", Pass: " + request.result.pass);
          } else {
                alert("Kenny couldn't be found in your database!");
          }
        };
}

function readAll() {
        var objectStore = db.transaction("admins").objectStore("admins");

        objectStore.openCursor().onsuccess = function(event) {
          var cursor = event.target.result;
          if (cursor) {
                alert("Name for id " + cursor.key + " is " + cursor.value.name + ", Pass: " + cursor.value.pass);
                cursor.continue();
          }
          else {
                alert("No more entries!");
          }
        };
}

function add() {
        var request = db.transaction(["admins"], "readwrite")
                .objectStore("admins")
                .add({ id: "1", name: "admin2", pass: "admin2" });

        request.onsuccess = function(event) {
                alert("admin2 has been added to your database.");
        };

        request.onerror = function(event) {
                alert("Unable to add data\r\nadmin2 is aready exist in your database! ");
        }

}

function remove() {

        var request = db.transaction(["admins"], "readwrite")
                .objectStore("admins")
                .delete("1");
        request.onsuccess = function(event) {
          alert("admin2 entry has been removed from your database.");
        };
}

function checkAdmin(nomeCliente, senhaCliente)
{
    var objectStore = db.transaction("admins").objectStore("admins");

        objectStore.openCursor().onsuccess = function(event) {
          var cursor = event.target.result;
          if (cursor) {
                if(nomeCliente==cursor.value.name && senhaCliente==cursor.value.pass)
                    {
                        logon(nomeCliente, senhaCliente);
                        return;
                    }
               cursor.continue();
          }
            else{
                alert("admin n encontrado");
            }
        };
}
