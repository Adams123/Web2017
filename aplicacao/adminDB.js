/* Membros do Grupo:
Adams Vietro Codignotto da Silva - 6791943
Antonio Pedro Lavezzo Mazzarolo - 8626232
Gustavo Dutra Santana - 8532040
Veronica Vannini - 8517369 */


function addAdmin(nome, cpf, foto, telefone, email) {

    requestDB = db.transaction(["admins"], "readwrite")
        .objectStore("admins")
        .add({
            id: dbSizeAdm,
            name: nome,
            pass: "admin",
            cpf: cpf,
            foto: foto,
            telefone: telefone,
            email: email
        });
    requestDB.onsuccess = function(){
        console.log("Adicionado " + name + " com id " + dbSizeAdm);
        dbSizeAdm = dbSizeAdm + 1;
    }
    requestDB.onerror = function()
    {
        console.log("Erro");
    }
}

function read() {
    var transaction = db.transaction(["admins"]);
    var objectStore = transaction.objectStore("admins");
    requestDB = objectStore.get("0");
    requestDB.onerror = function (event) {
        alert("Unable to retrieve data from database!");
    };
    requestDB.onsuccess = function (event) {
        if (requestDB.result) {
            alert("Name: " + requestDB.result.name + ", Pass: " + requestDB.result.pass);
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
