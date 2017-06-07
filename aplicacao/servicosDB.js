/* Membros do Grupo:
Adams Vietro Codignotto da Silva - 6791943
Antonio Pedro Lavezzo Mazzarolo - 8626232
Gustavo Dutra Santana - 8532040
Veronica Vannini - 8517369 */

//adiciona serviço à base
function addServ() {
    var nome = document.getElementById('addNomeServ').value;
    var foto = imagem;
    var descricao = document.getElementById('addDescServ').value;
    var preco = document.getElementById('addPrecoServ').value;
    var serv = {
        nome: nome,
        foto: foto,
        descricao: descricao,
        preco: preco
    };
    requestDB = db.transaction(["servicos"], "readwrite")
        .objectStore("servicos")
        .add(serv);
    requestDB.onsuccess = function () {
        console.log("Adicionado " + nome);
        alert(nome + " foi adicionado com sucesso!");
    }
    requestDB.onerror = function () {
        console.log("Erro");
        alert("Falha ao adicionar " + nome + ".");
    }
    addToServicos(serv);
}
//apenas para adicionar ao dropdown de servicos
function addToServicos(servico) {
    if ($("#dropdownServicosAdd option[value='" + servico.nome + "']").length == 0) //se a opção não existe adiciona, senão faz nada
        $('#dropdownServicosAdd').append($('<option>', {
            "value": servico.nome,
            "text": servico.nome
        }));
};

function renderServicos() {
    $("#servicos option").remove();
    var trans = db.transaction("servicos", IDBTransaction.READ_ONLY);
    var store = trans.objectStore("servicos");
    var cursorRequest = store.openCursor();

    cursorRequest.onerror = function (error) {
        console.log(error);
    };

    cursorRequest.onsuccess = function (evt) {
        var cursor = evt.target.result;
        if (cursor) {
            addToServicos(cursor.value);
            cursor.continue();
        }
    };
}

function addToPets(pet, id) {
    if ($("#petsServicos option[id='pet" + pet.id + "']").length == 0) //se a opção não existe adiciona, senão faz nada
        $('#petsServicos').append($('<option>', {
            "value": pet.nome,
            "text": pet.nome,
            "id": "pet" + id //gambi pra achar a id do pet mais facil
        }));
}

function renderPets() {
    $("#petsServicos option").remove();
    var trans = db.transaction("animais", IDBTransaction.READ_ONLY);
    var store = trans.objectStore("animais");
    var cursorRequest = store.openCursor();

    cursorRequest.onerror = function (error) {
        console.log(error);
    };
    var i = 1;
    cursorRequest.onsuccess = function (evt) {
        var cursor = evt.target.result;
        if (cursor) {
            addToPets(cursor.value, i);
            i = i + 1;
            cursor.continue();
        }
    };
}

function addToLiberar(horario) {
    if ($("#dropdownServicosDel option[id='serv" + horario.id + "']").length == 0) //se a opção não existe adiciona, senão faz nada
        $('#dropdownServicosDel').append($('<option>', {
            "value": horario.title + " " + horario.pet,
            "text": horario.title + " " + horario.pet,
            "id": "serv" + horario.id //gamb pra achar a id do serv mais facil
        }));
}


function renderServsAtivos() {
    var trans = db.transaction("servicosAtivos", IDBTransaction.READ_ONLY);
    var store = trans.objectStore("servicosAtivos");
    var cursorRequest = store.openCursor();
    $('#dropdownServicosDel option').remove();
    cursorRequest.onerror = function (error) {
        console.log(error);
    };
    cursorRequest.onsuccess = function (evt) {
        var cursor = evt.target.result;
        if (cursor) {
            addToLiberar(cursor.value);
            cursor.continue();
        }
    };
}
