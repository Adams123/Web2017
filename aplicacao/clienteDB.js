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


var db;
var dbSize;
var clienteRequest = window.indexedDB.open("PetShopDB", 1);

clienteRequest.onerror = function (event) {
    console.log("error: ");
};

clienteRequest.onsuccess = function (event) {
    db = clienteRequest.result;
    console.log("Conectado");
    var qnt = db.transaction(["clientes"], "readwrite")
        .objectStore("clientes").count();

    qnt.onsuccess = function () //verificando se há clientes cadastrados
    {
        dbSize = qnt.result;
    }
    qnt.onerror = function()
    {
        var objectStore = db.createObjectStore("clientes", {
        keyPath: "id",
        autoIncrement: true
    });
    }


};

clienteRequest.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("clientes", {
        keyPath: "id",
        autoIncrement: true
    });
}

function addCliente(nome, cpf, endereco, foto, telefone, email) {

    var clienteRequest = db.transaction(["clientes"], "readwrite")
        .objectStore("clientes")
        .add({
            id: dbSize,
            name: nome,
            endereco: endereco,
            pass: "cliente",
            cpf: cpf,
            foto: foto,
            telefone: telefone,
            email: email
        });
    clienteRequest.onsuccess = function() {
        console.log("Adicionado " + name + " com id " + dbSize);
        dbSize = dbSize + 1;
    }
}

function readCli() {
    var transaction = db.transaction(["clientes"]);
    var objectStore = transaction.objectStore("clientes");
    var clienteRequest = objectStore.get("0");
    clienteRequest.onerror = function (event) {
        alert("Unable to retrieve data from database!");
    };
    clienteRequest.onsuccess = function (event) {
        if (clienteRequest.result) {
            alert("Name: " + clienteRequest.result.name + ", Pass: " + clienteRequest.result.pass);
        } else {
            alert("Kenny couldn't be found in your database!");
        }
    };
}

function readAllCli() {
    var objectStore = db.transaction("clientes").objectStore("clientes");

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
    var objectStore = db.transaction(["clientes"], "readwrite").objectStore("clientes");
    objectStore.clear();
}

function checkCliente(nomeCliente, senhaCliente) {
    var objectStore = db.transaction("clientes").objectStore("clientes");

    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            if (nomeCliente == cursor.value.name && senhaCliente == cursor.value.pass) {
                logon(nomeCliente, senhaCliente, 0);
                return;
            }
            cursor.continue();
        } else {
            alert("Cadastro não encontrado, favor cadastrar por um admin.");
        }
    };
}
