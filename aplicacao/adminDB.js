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
    var CPF = document.getElementById("CPFAdmEdit");
    var foto = document.getElementById("imgAdm");
    var tel = document.getElementById("TelAdmEdit");
    var email = document.getElementById("emailAdm");

    nome.value = adm.name;
    pass.value = adm.pass;
    CPF.value = whoIsNavigating;

    if (adm.foto != null)
        foto.src = adm.foto;
    else foto.src = "https://www.codeproject.com/KB/architecture/648760/Null.png";
    tel.value = adm.telefone;
    email.value = adm.email;
}

function getAdmInfo() {
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


//-------------ganhos
function listarGanhosServicos(servico)
{
    var tabela = document.getElementById("tabelaGanhosServicos");
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    var h31 = document.createElement('h2');
    h31.innerHTML = servico.nome;
    td1.appendChild(h31);
    tr.appendChild(td1);
    var td2 = document.createElement('td');
    var h32 = document.createElement('h3');
    h32.innerHTML = calculaLucroServ(servico);
    td2.appendChild(h32);
    tr.appendChild(td2);
    tabela.appendChild(tr);

    var lucroServ = document.getElementById("lucroServ");
    lucroServ.value = lucroServ.value + lucro;
}

function listarGanhosProdutos(produto)
{
    var tabela = document.getElementById("tabelaGanhosProdutos");
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    var h31 = document.createElement('h2');
    h31.innerHTML = produto.barCode;
    td1.appendChild(h31);
    tr.appendChild(td1);
    var td2 = document.createElement('td');
    var h32 = document.createElement('h3');
    h32.innerHTML = "R$" + calculaLucroProd(produto);
    td2.appendChild(h32);
    tr.appendChild(td2);
    tabela.appendChild(tr);
}

function listarGanhos()
{
    readAllProdutos();


}
function readAllProdutos()
{
    var produtos = [];
    var objectStore = db.transaction("produtos").objectStore("produtos");
    var i = 0;
    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            addKey(cursor.key, "produtos", produtos, returnProd);
            cursor.continue();
            i = i + 1;
        } else {
            for (var j = 0; j < i; j++) {
                if (!checkDone(produtos[j].barCode,"tabelaGanhosProdutos")) //evita ficar readicionando html toda vez q abrir a aba
                    listarGanhosProdutos(produtos[j], "tabelaGanhosProdutos");
            }
        }
    };
}
function readAllServicos()
{
    var servicos = [];
    var objectStore = db.transaction("servicos").objectStore("servicos");
    var i = 0;
    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            addKey(cursor.key, "produtos", produtos, returnProd);
            cursor.continue();
            i = i + 1;
        } else {
            for (var j = 0; j < i; j++) {
                if (!verifica(servicos[j])) //evita ficar readicionando html toda vez q abrir a aba
                    listarGanhosProdutos(produtos[j]);
            }
        }
    };
}

function calculaLucroProd(produto)
{
    return parseFloat(produto.qntVend * produto.preco).toFixed(2);
}
function calculaLucroServ(servico)
{
    return parseFloat(servico.preco).toFixed(2);
}
