/* Membros do Grupo:
Adams Vietro Codignotto da Silva - 6791943
Antonio Pedro Lavezzo Mazzarolo - 8626232
Gustavo Dutra Santana - 8532040
Veronica Vannini - 8517369 */

function addPet() {
	var nome = document.getElementById('addNomePet').value;
	var raca = document.getElementById('addRacaPet').value;
	var idade = document.getElementById('addIdadePet').value;
	var foto = document.getElementById('addFotoPet').value;

    requestDB = db.transaction(["animais"], "readwrite")
        .objectStore("animais")
        .put({
            id: qntAnimais,
            nome: nome,
            raca: raca,
            idade: idade,
            foto: foto
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

function readPet() {
    var transaction = db.transaction(["animais"]);
    var objectStore = transaction.objectStore("animais");
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

function readAllPet() {
    var objectStore = db.transaction("animais").objectStore("animais");

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

function removeAllPet() { //limpa todos os registros
    var objectStore = db.transaction(["animais"], "readwrite").objectStore("animais");
    objectStore.clear();
}
