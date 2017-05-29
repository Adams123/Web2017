/* Membros do Grupo:
Adams Vietro Codignotto da Silva - 6791943
Antonio Pedro Lavezzo Mazzarolo - 8626232
Gustavo Dutra Santana - 8532040
Veronica Vannini - 8517369 */

function addServ() {
	var nome = document.getElementById('addNomeServ').value;
	var foto = document.getElementById('addFotoServ').value;
	var descricao = document.getElementById('addDescServ').value;
	var preco = document.getElementById('addPrecoServ').value;

    requestDB = db.transaction(["servicos"], "readwrite")
        .objectStore("servicos")
        .put({
            id: qntservicos,
            nome: nome,
            foto: foto,
            descricao: descricao,
            preco: preco
        });
    requestDB.onsuccess = function(){
        console.log("Adicionado " + nome);
		alert(nome + " foi adicionado com sucesso!");
    }
    requestDB.onerror = function(){
        console.log("Erro");
		alert("Falha ao adicionar " + nome + ".");
    }
}

function readServ() {
    var transaction = db.transaction(["servicos"]);
    var objectStore = transaction.objectStore("servicos");
    requestDB = objectStore.get("0");
    requestDB.onerror = function (event) {
        alert("Unable to retrieve data from database!");
    };
    requestDB.onsuccess = function (event) {
        if (requestDB.result) {
            alert("Name: " + requestDB.result.name);
        } else {
            alert("Kenny couldn't be found in your database!");
        }
    };
}

function readAllServ() {
    var objectStore = db.transaction("servicos").objectStore("servicos");

    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            alert("Id: " + cursor.key + ", Nome: " + cursor.value.name);
            cursor.continue();
        } else {
            alert("Não há mais registros");
        }
    };
}

function removeAllServ() { //limpa todos os registros
    var objectStore = db.transaction(["servicos"], "readwrite").objectStore("servicos");
    objectStore.clear();
}
