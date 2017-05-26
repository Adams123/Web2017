window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
    window.alert("Seu browser não suporta IndexedDB.")
}

const adminData = [
    {
        id: 0,
        name: "admin",
        pass: "admin",
        cpf: "23132345411",
        foto: "String",
        telefone: "123123",
        email: "teste@gmail.com"
    }
];

window.indexedDB.deleteDatabase("PetShopDB, 1");

var db, dbSizeCli, dbSizeAdm;
var requestDB = window.indexedDB.open("PetShopDB", 1);

requestDB.onerror = function (event) {
    console.log("Erro ao conectar na base");
};

requestDB.onsuccess = function (event) {
    db = requestDB.result;
    console.log("Contando cliente");

    var qnt = db.transaction(["clientes"], "readwrite")
        .objectStore("clientes").count();

    qnt.onsuccess = function () //verificando se há clientes cadastrados
    {
        dbSizeCli = qnt.result;
    }
    qnt.onerror = function () {
        dbSizeCli = 0;
    }

    console.log("Contando admin");

    var qntAdm = db.transaction(["admins"], "readwrite")
        .objectStore("admins").count();

    qntAdm.onsuccess = function () //verificando se há admins cadastrados
    {
        if (qnt.result == 0) {
            db.transaction(["admins"], "readwrite")
                .objectStore("admins").add(adminData[0]);
            dbSizeAdm = qntAdm.result;
        } else
            dbSizeAdm = qntAdm.result;
    }
};

requestDB.onupgradeneeded = function (event) {
    console.log("Criando cliente");
    var db = event.target.result;
    var objectStoreC = db.createObjectStore("clientes", {
        keyPath: "id",
        autoIncrement: true
    });

    console.log("Criando admin");

    var objectStoreA = db.createObjectStore("admins", {
        keyPath: "id",
        autoIncrement: true
    });
    for (var i in adminData) {
        objectStoreA.add(adminData[i]);
    }
}
