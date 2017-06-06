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
        .add({
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
    var nomeCliente = $('#user').val();
    var senhaCliente = $('#senha').val();
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
            checkCliente(nomeCliente, senhaCliente);
            return false;
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
function listarGanhosServicos(servico) {

    var tabela = document.getElementById("tabelaGanhosServicos");
    if (tabela.innerHTML.indexOf(servico.nome) > -1) return;
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    var h31 = document.createElement('h2');
    h31.innerHTML = servico.nome;
    td1.appendChild(h31);
    tr.appendChild(td1);
    var td2 = document.createElement('td');
    var h32 = document.createElement('h3');
    h32.innerHTML = "R$" + servico.preco;
    td2.appendChild(h32);
    tr.appendChild(td2);
    tabela.appendChild(tr);

    //var lucroServ = document.getElementById("lucroServ");
    //lucroServ.value = lucroServ.value + lucro;
}

function listarGanhosProdutos(produto) {
    var tabela = document.getElementById("tabelaGanhosProdutos");
    if (tabela.innerHTML.indexOf(produto.barCode) > -1) return;
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    var h31 = document.createElement('h2');
    h31.innerHTML = produto.barCode;
    td1.appendChild(h31);
    tr.appendChild(td1);
    var td2 = document.createElement('td');
    var h32 = document.createElement('h3');
    var lucro = calculaLucro(produto);
    h32.innerHTML = "R$" + lucro;
    td2.appendChild(h32);
    tr.appendChild(td2);
    tabela.appendChild(tr);

    var lucroProd = $('#lucroProd');
    var lucroAtual = parseFloat(lucroProd.val()).toFixed(2);
    var prodTotal = parseFloat(lucro) + parseFloat(lucroAtual);
    lucroProd.val(prodTotal.toFixed(2));

    var lucroTotal = $('#lucroTotal');
    var lucroTotalAtual = parseFloat(lucroTotal.val()).toFixed(2);
    var tudo = parseFloat(lucro) + parseFloat(lucroTotalAtual);
    lucroTotal.val(tudo.toFixed(2));
}

function listarGanhos() {
    listAllItems("produtos", "tabelaGanhosProdutos", listarGanhosProdutos);
    listAllItems("servicos", "tabelaGanhosServicos", listarGanhosServicos);
}

function calculaLucro(item) {
    return parseFloat(item.preco * item.qntVend).toFixed(2);
}

//---------------------calendario
function addEventToCalendar() { //nao verifica se tem ja adicionado

    var nome = $( "#dropdownServicos option:selected" ).text();
    var calendar = $('.calendar');
    var events=[];
    events = calendar.fullCalendar('clientEvents');

    var start = $('#dataServ').val() +"T"+ $('#tempServ').val();
    var newEvent = {
        title:nome,
        start: start,
        duration: '01:00',
        allDay: false
    };
    console.log(events);
    if($.inArray(newEvent, events)!=-1) return false;
    console.log(newEvent);
    calendar.fullCalendar('renderEvent', newEvent, true);
}
