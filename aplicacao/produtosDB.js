/* Membros do Grupo:
Adams Vietro Codignotto da Silva - 6791943
Antonio Pedro Lavezzo Mazzarolo - 8626232
Gustavo Dutra Santana - 8532040
Veronica Vannini - 8517369 */

function addProd() {
	var nome = document.getElementById('nomeProdAdd').value;
	var barCode = document.getElementById('idProdAdd').value;
	var foto = document.getElementById('fotoProdAdd').value;
	var descricao = document.getElementById('descricaoProdAdd').value;
	var preco = document.getElementById('precoProdAdd').value;
	var qntEstoque = document.getElementById('quantProdAdd').value;
    var qntVend = document.getElementById('vendasProdAdd').value;

    requestDB = db.transaction(["produtos"], "readwrite")
        .objectStore("produtos")
        .put({
            nome: nome,
            barCode: barCode,
            foto: foto,
            descricao: descricao,
            preco: preco,
            qntEstoque: qntEstoque,
            qntVend: qntVend
        });

    requestDB.onsuccess = function () {
        console.log("Adicionado " + nome);
		alert(nome + " foi adicionado com sucesso!");
    }
    requestDB.onerror = function () {
        console.log("Erro");
		alert("Falha ao adicionar " + nome + ".");
    }
}

function readProd() {
    var transaction = db.transaction(["produtos"]);
    var objectStore = transaction.objectStore("produtos");
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

function readAllProd() {
    var objectStore = db.transaction("produtos").objectStore("produtos");

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

function removeAllProd() { //limpa todos os
    var objectStore = db.transaction(["produtos"], "readwrite").objectStore("produtos");
    objectStore.clear();
}
