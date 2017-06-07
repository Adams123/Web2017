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
    var trans = db.transaction("animais").objectStore("animais");
    var request = trans.openCursor();
    request.onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            if (cursor.value.cliente == whoIsNavigating) {
                clientPets.push(cursor.value);
                clientPets[clientPets.length - 1].servicos = "";
            }
            cursor.continue();
        } else {
            getServicosFromPet();
        }
    };
}

function getServicosFromPet() {
    var trans = db.transaction("servicosAtivos").objectStore("servicosAtivos");
    var request = trans.openCursor();
    request.onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            for (var i = 0; i < clientPets.length; i++) {
                if (strcmp(cursor.value.pet, clientPets[i].nome) == 0) //tem servico
                {
                    clientPets[i].despesas = 0;
                    clientPets[i].servicos = clientPets[i].servicos + "," + cursor.value.title;
                }
            }
            cursor.continue();
        } else {
            getDespesasFromPet();
        }
    };
}

function getDespesasFromPet() {
    var count;
    var trans = db.transaction("servicos").objectStore("servicos");
    var request = trans.openCursor();
    request.onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            console.log("VENDO " + cursor.value.nome);
            for (var i = 0; i < clientPets.length; i++) {
                console.log(clientPets[i].servicos);
                count = (clientPets[i].servicos.match(cursor.value.nome) || []).length;
                console.log(count);
                if (count > 0) {
                    var desp = parseFloat(count) * parseFloat(cursor.value.preco);
                    console.log(desp);
                    var total = parseFloat(desp) + parseFloat(clientPets[i].despesas);
                    console.log(total);
                    clientPets[i].despesas = parseFloat(total).toFixed(2);
                    console.log(clientPets[i].despesas);
                }

            }
            cursor.continue();
        } else showPets();
    };
}

function showPets() {
    //getClientPets();
    // getServicosFromPet();
    //getDespesasFromPet();
    console.log(clientPets);
    $('#tableListPetsCli tr').remove();
    var body = $('#tableListPetsCli');
    for (var i = 0; i < clientPets.length; i++) {
        clientPets[i].servicos = clientPets[i].servicos.slice(1);
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var h1 = document.createElement('h2');
        h1.innerHTML = clientPets[i].nome;
        td1.appendChild(h1);
        tr.appendChild(td1);
        var td2 = document.createElement('td');
        var h2 = document.createElement('h2');
        h2.innerHTML = clientPets[i].raca;
        td2.appendChild(h2);
        tr.appendChild(td2);
        var td3 = document.createElement('td');
        var h3 = document.createElement('h2');
        h3.innerHTML = clientPets[i].idade;
        td3.appendChild(h3);
        tr.appendChild(td3);
        var td4 = document.createElement('td');
        var img = document.createElement('img');
        img.setAttribute("src", clientPets[i].foto);
        img.setAttribute("class", "imagem");
        td4.appendChild(img);
        tr.appendChild(td4);
        var td5 = document.createElement('td');
        var h5 = document.createElement('h3');
        h5.innerHTML = clientPets[i].servicos;
        td5.appendChild(h5);
        tr.appendChild(td5);
        var td6 = document.createElement('td');
        var input = document.createElement('input');
        input.value = "R$" + clientPets[i].despesas;
        td6.appendChild(input);
        tr.appendChild(td6);
        body.append(tr);
    }
}
