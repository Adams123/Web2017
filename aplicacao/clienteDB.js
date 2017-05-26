/* Membros do Grupo:
Adams Vietro Codignotto da Silva - 6791943
Antonio Pedro Lavezzo Mazzarolo - 8626232
Gustavo Dutra Santana - 8532040
Veronica Vannini - 8517369 */

// Ta dando ruim isso aqui
function addCliente() {
	var nome = document.getElementById('NomeCli').value;
	var cpf = document.getElementById('CPFCli').value;
	var endereco = document.getElementById('EnderecoCli').value;
	var foto = document.getElementById('FotoCli').value;
	var telefone = document.getElementById('TelCli').value;
	var email = document.getElementById('EmailCli').value;

    requestDB = db.transaction(["clientes"], "readwrite")
        .objectStore("clientes")
        .add({
            name: nome,
            endereco: endereco,
            pass: "cliente",
            cpf: cpf,
            foto: foto,
            telefone: telefone,
            email: email
        });
    requestDB.onsuccess = function () {
        console.log("Adicionado " + name);
    }
    requestDB.onerror = function () {
        console.log("Erro");
    }
}

function readCli() {
    var transaction = db.transaction(["clientes"]);
    var objectStore = transaction.objectStore("clientes");
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
