/* Membros do Grupo:
Adams Vietro Codignotto da Silva - 6791943
Antonio Pedro Lavezzo Mazzarolo - 8626232
Gustavo Dutra Santana - 8532040
Veronica Vannini - 8517369 */

function addAdmin() {
    var nome = document.getElementById('NomeAdm').value;
    var cpf = document.getElementById('CPFAdm').value;
    var foto = imagem;
    var telefone = document.getElementById('TelAdm').value;
    var email = document.getElementById('EmailAdm').value;

    requestDB = db.transaction(["admins"], "readwrite")
        .objectStore("admins")
        .put({
            name: nome,
            pass: "admin",
            cpf: cpf,
            foto: foto,
            telefone: telefone,
            email: email
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

function readAdmin() {
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

function readAllAdmin() {
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

function removeAllAdmin() { //limpa todos os 
    var objectStore = db.transaction(["admins"], "readwrite").objectStore("admins");
    objectStore.clear();
}

function checkAdmin() {
    var nomeCliente = $('#user').value;
    var senhaCliente = $('#senha').value;
    var objectStore = db.transaction("admins").objectStore("admins");

    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            if (nomeCliente == cursor.value.name && senhaCliente == cursor.value.pass) {
                var cpf = cursor.value.cpf;
                logon(cpf, 1);
                return false;
            }
            cursor.continue();
        } else {
            return checkCliente(nomeCliente, senhaCliente);
        }
    };
}

function editAdmProfile(adm) {
    var nome = document.getElementById("nomeAdm");
    var pass = document.getElementById("passAdm");
    var CPF = document.getElementById("CPFAdm");
    var foto = document.getElementById("imgAdm");
    var tel = document.getElementById("TelAdm");
    var email = document.getElementById("emailAdm");

    nome.value = adm.name;
    pass.value = adm.pass;
    CPF.value = Number(whoIsNavigating);
    if (adm.foto != null)
        foto.src = adm.foto;
    else foto.src = "https://www.codeproject.com/KB/architecture/648760/Null.png";
    tel.value = adm.telefone;
    email.value = adm.email;
    console.log(tel.value);
}

function getAdmInfo() {
    whoIsNavigating = "10000000000";
    getKey(whoIsNavigating, "admins", editAdmProfile);
}

function updateAdm() {
    var nome = document.getElementById("nomeAdm").value;
    var pass = document.getElementById("passAdm").value;
    var foto = imagem;
    var tel = document.getElementById("TelAdm").value;
    var email = document.getElementById("emailAdm").value;
    console.log(tel);
    requestDB = db.transaction(["admins"], "readwrite")
        .objectStore("admins")
        .put({
            name: nome,
            pass: pass,
            cpf: whoIsNavigating,
            foto: foto,
            telefone: tel,
            email: email
        });
    requestDB.onsuccess = function () {
        console.log("Atualizado " + nome);
        alert(nome + " foi atualizado com sucesso!");
    };
    requestDB.onerror = function () {
        console.log("Erro");
        alert("Falha ao atualizar " + nome + ".");
    };
}
