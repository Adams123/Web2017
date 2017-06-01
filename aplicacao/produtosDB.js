/* Membros do Grupo:
Adams Vietro Codignotto da Silva - 6791943
Antonio Pedro Lavezzo Mazzarolo - 8626232
Gustavo Dutra Santana - 8532040
Veronica Vannini - 8517369 */



function addProd() {
	var nome = document.getElementById('nomeProdAdd').value;
	var barCode = document.getElementById('idProdAdd').value;
	var foto = imagem;
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
    };
    requestDB.onerror = function () {
        console.log("Erro");
		alert("Falha ao adicionar " + nome + ".");
    };
}

function getProdInfo(){
    getKey(document.getElementById("idProdAtt").value, "produtos", getProd);
}

function getKey(id, store, getFunc) {
    var transaction = db.transaction([store], "readwrite");
    var objectStore = transaction.objectStore(store);
    requestDB = objectStore.get(id);
    requestDB.onerror = function (event) {
        alert("Unable to retrieve data from database!");
    };
    requestDB.onsuccess = function(event)
    {
        if (requestDB.result) {
            getFunc(requestDB.result);
        } else {
            console.log("Kenny couldn't be found in your database!");
        }
    };
}


function getProd(prod)
{

    var nome = document.getElementById('nomeProdAtt');
	var foto = document.getElementById('fotoProdAttDest');
	var descricao = document.getElementById('descricaoProdAtt');
	var preco = document.getElementById('precoProdAtt');
	var qntEstoque = document.getElementById('quantProdAtt');
    var qntVend = document.getElementById('vendasProdAtt');
    if(!prod) return false;
    nome.value=prod.nome;
    foto.src=prod.foto;
    descricao.value=prod.descricao;
    preco.value=prod.preco;
    qntEstoque.value=prod.qntEstoque;
    qntVend.value=prod.qntVend;
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
