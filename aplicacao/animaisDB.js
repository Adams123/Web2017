/* Membros do Grupo:
Adams Vietro Codignotto da Silva - 6791943
Antonio Pedro Lavezzo Mazzarolo - 8626232
Gustavo Dutra Santana - 8532040
Veronica Vannini - 8517369 */
var clientPets = [];

function addPet() {
    var nome = document.getElementById('addNomePet').value;
    var raca = document.getElementById('addRacaPet').value;
    var idade = document.getElementById('addIdadePet').value;
    var foto = imagem;

    requestDB = db.transaction(["animais"], "readwrite")
        .objectStore("animais")
        .add({
            nome: nome,
            raca: raca,
            idade: idade,
            foto: foto,
            cliente: whoIsNavigating
        });
}

function getClientPets() {
    clientPets = [];
    var objectStore = db.transaction("animais").objectStore("animais");
    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            if (cursor.value.cliente == whoIsNavigating)
                clientPets.push(cursor.value);
            cursor.continue();
        }
    };
}

function getServicosFromPet() {
    db.transaction("servicosAtivos").objectStore("servicosAtivos");
    var request = objectStore.openCursor();
    request.onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            for (var i = 0; i < clientPets.length; i++) {
                clientPets[i].servicos = "";
                if (strcmp(cursor.value.pet, clientPets[i].nome) == 0) //tem servico
                    clientPets[i].servicos = clientPets[i].servicos + "," + cursor.value.title;
            }
            cursor.continue();
        }
    };
}

function getDespesasFromPet() {
    db.transaction("servicos").objectStore("servicos");
    var request = objectStore.openCursor();
    request.onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            for (var i = 0; i < clientPets.length; i++) {
                clientPets[i].despesas = 0;
                var count = (clientPets.servicos.match(/cursor.value.nome/g) || []).length;
                console.log(count);
            }
            cursor.continue();
        }
    };
}

function showPets() {
    getClientPets();
    var body = $('#tableListPetsCli');
    for (var i = 0; i < clientPets.length; i++) {

    }
}
