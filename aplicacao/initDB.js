window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
    window.alert("Seu browser não suporta IndexedDB.");
}

const adminData = [
    {
        name: "admin",
        pass: "admin",
        cpf: "10000000000",
        foto: null,
        telefone: null,
        email: "teste@gmail.com"
    }
];

window.indexedDB.deleteDatabase("PetShopDB, 1");

var db;
var requestDB = window.indexedDB.open("PetShopDB", 1);

requestDB.onerror = function (event) {
    console.log("Erro ao conectar na base");
};

requestDB.onsuccess = function (event) {
    db = requestDB.result;
    console.log("Contando cliente");

    var qnt = db.transaction(["clientes"], "readwrite")
        .objectStore("clientes").count();

    console.log("Contando admin");

    var qntAdm = db.transaction(["admins"], "readwrite")
        .objectStore("admins").count();

    qntAdm.onsuccess = function () //verificando se há admins cadastrados
    {
        if (qnt.result == 0) {
            db.transaction(["admins"], "readwrite")
                .objectStore("admins").add(adminData[0]);
		}
    }
};

requestDB.onupgradeneeded = function (event) {
    console.log("Criando cliente");
    var db = event.target.result;
    var objectStoreC = db.createObjectStore("clientes", {
        keyPath: "cpf"
    });

    console.log("Criando admin");

    var objectStoreA = db.createObjectStore("admins", {
        keyPath: "cpf"
    });
    for (var i in adminData) {
        objectStoreA.add(adminData[i]);
    }
}
