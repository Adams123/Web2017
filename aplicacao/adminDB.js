/* Membros do Grupo:
Adams Vietro Codignotto da Silva - 6791943
Antonio Pedro Lavezzo Mazzarolo - 8626232
Gustavo Dutra Santana - 8532040
Veronica Vannini - 8517369 */


//adiciona um novo admin à base, com senha "admin"
function addAdmin() {
    var nome = document.getElementById('NomeAdm').value;
    var cpf = document.getElementById('CPFAdm').value;
    var foto = imagem;
    var telefone = document.getElementById('TelAdm').value;
    var email = document.getElementById('EmailAdm').value;

    if (cpf < 0) {
        alert("CPF inválido");
        return;
    }
    if (!checkIfNull(nome, cpf, foto, telefone, email)) {
        alert("Todos os valores são obrigatórios");
        return;
    }

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
    }
    requestDB.onerror = function () {
        console.log("Erro");
    }
}

//verifica se o usuario fazendo login é admin. caso contrário, verifica se o usuário é cliente
function checkAdmin() {
    var achou = 0;
    var nomeCliente = $('#user').val();
    var senhaCliente = $('#senha').val();
    var objectStore = db.transaction("admins").objectStore("admins");
    object = objectStore.openCursor();
    object.onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            if (strcmp(nomeCliente, cursor.value.name) == 0 && strcmp(senhaCliente, cursor.value.pass) == 0) {
                var cpf = cursor.value.cpf;
                achou = 1;
                logon(cpf, 1);
            }
            cursor.continue();
        } else {
            checkCliente(nomeCliente, senhaCliente, achou);
        }
    };
}


//mostra o cadastro do admin no profile, apenas setando os valores
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
    foto.src = adm.foto;
    tel.value = adm.telefone;
    email.value = adm.email;
}

//exibe os valores do admin no profile, usando a funcao editAdmProfile
function getAdmInfo() {
    getKey(whoIsNavigating, "admins", editAdmProfile);
}


//envia os dados novos do profileAdmin para a base, atualizando o cadastro
function updateAdm() {
    var nome = document.getElementById("nomeAdm").value;
    var pass = document.getElementById("passAdm").value;
    var foto = imagem;
    var tel = document.getElementById("TelAdm").value;
    var email = document.getElementById("emailAdm").value;

    if (!checkIfNull(nome, pass, foto, tel, email)) {
        alert("Todos os valores são obrigatórios");
        return;
    }
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
    };
    requestDB.onerror = function () {
        console.log("Erro");
    };
}


//-------------ganhos

//cria a tabela de ganhos de servicos e calculo o lucro apenas para servicos
function listarGanhosServicos(servico) {
    var tabela = document.getElementById("tabelaGanhosServicos");
    if (checkInTableh2("tabelaGanhosServicos", servico.nome) == 0) {
        var h32 = document.createElement('h3');
        calculaLucroServico(servico, h32);
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var h31 = document.createElement('h2');
        h31.innerHTML = servico.nome;
        td1.appendChild(h31);
        tr.appendChild(td1);
        var td2 = document.createElement('td');
        td2.appendChild(h32);
        tr.appendChild(td2);
        tabela.appendChild(tr);
    }
}

function calculaLucroTotal() {
    var lucroTotal = $('#lucroTotal');
    var lucroProd = $('#lucroProd').val();
    var lucroServ = $('#lucroServ').val();
    console.log(lucroServ);
    lucroTotal.val(parseFloat(lucroProd) + parseFloat(lucroServ));
}

function calculaLucroServico(servico, h3) {
    var trans = db.transaction("servicosAtivos", IDBTransaction.READ_ONLY);
    var store = trans.objectStore("servicosAtivos");
    var lucro = 0.00;
    var cursorRequest = store.openCursor();

    cursorRequest.onerror = function (error) {
        console.log(error);
    };

    cursorRequest.onsuccess = function (evt) {
        var cursor = evt.target.result;
        if (cursor) {
            if (strcmp(cursor.value.title, servico.nome) == 0) {
                lucro = parseFloat(lucro) + parseFloat(servico.preco);
            }
            cursor.continue();
        } else {
            var lucroServ = $('#lucroServ');
            var lucrototal = parseFloat(lucroServ.val()) + parseFloat(lucro)
            lucroServ.val(lucrototal);
            h3.innerHTML = lucro;
            calculaLucroTotal(); //calcula aqui por conta de assincronia, é certeza q o cursor vai ter acabado aqui
        }
    };
}

//cria a tabela de ganhos de produtos e calculo o lucro apenas para produtos
function listarGanhosProdutos(produto) {
    var tabela = document.getElementById("tabelaGanhosProdutos");
    if (checkInTableh2("tabelaGanhosProdutos", produto.barCode) == 0) {
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
        calculaLucroTotal();
    }
}
//monta as tabelas e lucros
function listarGanhos() {
    $('#tabelaGanhosProdutos td').remove();
    $('#tabelaGanhosServicos td').remove();
    listAllItems("produtos", listarGanhosProdutos);
    listAllItems("servicos", listarGanhosServicos);
    calculaLucroTotal();
}
//calcula lucro de prod
function calculaLucro(item) {
    return parseFloat(item.preco * item.qntVend).toFixed(2);
}

//---------------------calendario

//adiciona um novo servico ao calendário
function addEventToCalendar() { //nao verifica se tem ja adicionado

    var nome = $("#dropdownServicos option:selected").text();
    var calendar = $('.calendar');
    var events = [];
    events = calendar.fullCalendar('clientEvents');

    var start = $('#dataServ').val() + "T" + $('#tempServ').val();
    var newEvent = {
        title: nome,
        start: start,
        duration: '01:00',
        allDay: false
    };
    console.log(events);
    if ($.inArray(newEvent, events) != -1) return false;
    calendar.fullCalendar('renderEvent', newEvent, true);
}
