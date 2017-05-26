/* Membros do Grupo:
Adams Vietro Codignotto da Silva - 6791943
Antonio Pedro Lavezzo Mazzarolo - 8626232
Gustavo Dutra Santana - 8532040
Veronica Vannini - 8517369 */

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
    window.alert("Seu browser não suporta IndexedDB.")
}

const adminData = [
    {
        id: 1,
        name: "admin",
        pass: "admin",
        cpf: "23132345411",
        foto: "String",
        telefone: "123123",
        email: "teste@gmail.com"
    }
];


var db;
var dbSize;
var adminRequest = window.indexedDB.open("PetShopDB", 1);

adminRequest.onerror = function (event) {
    console.log("error: ");
};

adminRequest.onsuccess = function (event) {
    db = adminRequest.result;
    console.log("Conectado");

    var qnt = db.transaction(["admins"], "readwrite")
        .objectStore("admins").count();

    qnt.onsuccess = function () //verificando se há admins cadastrados
    {
        if (qnt.result == 0) {
            db.transaction(["admins"], "readwrite")
                .objectStore("admins").add(adminData[0]);
            dbSize = qnt.result + 1;
        } else
            dbSize = qnt.result;
    }
};

adminRequest.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("admins", {
        keyPath: "id",
        autoIncrement: true
    });
    for (var i in adminData) {
        objectStore.add(adminData[i]);
    }
}

function addAdmin(nome, cpf, foto, telefone, email) {

    var adminRequest = db.transaction(["admins"], "readwrite")
        .objectStore("admins")
        .add({
            id: dbSize,
            name: nome,
            pass: "admin",
            cpf: cpf,
            foto: foto,
            telefone: telefone,
            email: email
        });
    adminRequest.onsuccess = function(){
        console.log("Adicionado " + name + " com id " + dbSize);
        dbSize = dbSize + 1;
    }
}

function read() {
    var transaction = db.transaction(["admins"]);
    var objectStore = transaction.objectStore("admins");
    var adminRequest = objectStore.get("0");
    adminRequest.onerror = function (event) {
        alert("Unable to retrieve data from database!");
    };
    adminRequest.onsuccess = function (event) {
        if (adminRequest.result) {
            alert("Name: " + adminRequest.result.name + ", Pass: " + adminRequest.result.pass);
        } else {
            alert("Kenny couldn't be found in your database!");
        }
    };
}

function readAll() {
    var objectStore = db.transaction("admins").objectStore("admins");

    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            alert("Id: " + cursor.key + ", Nome: " + cursor.value.name + ", Pass: " + cursor.value.pass);
            cursor.continue();
        } else {
            alert("Não há mais registros");
        }
    };
}

function removeAll() { //limpa todos os 
    var objectStore = db.transaction(["admins"], "readwrite").objectStore("admins");
    objectStore.clear();
}

function checkAdmin(nomeCliente, senhaCliente) {
    var objectStore = db.transaction("admins").objectStore("admins");

    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            if (nomeCliente == cursor.value.name && senhaCliente == cursor.value.pass) {
                logon(nomeCliente, senhaCliente, 1);
                return;
            }
            cursor.continue();
        } else {
            checkClient(nomeCliente, senhaCliente);
        }
    };
}
