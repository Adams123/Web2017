// Membros do Grupo:
// * Adams Vietro Codignotto da Silva - 6791943
// * Antonio Pedro Lavezzo Mazzarolo - 8626232
// * Gustavo Dutra Santana - 8532040
// * Veronica Vannini - 8517369

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
    window.alert("Seu browser não suporta IndexedDB.");
}

window.indexedDB.deleteDatabase("PetShopDB, 1");

var db;
var qntAnimais, qntServicosAtivos;
var requestDB = window.indexedDB.open("PetShopDB", 1);
requestDB.onerror = function (event) {
    console.log("Erro ao conectar na base");
};

//realiza contagem de todas as rows de uma tabela
function countDb(store) {
    var store = db.transaction([store], "readonly").objectStore(store);
    var qnt = store.count();
    return qnt;
}

//apenas para adicionar ao dropdown de servicos
function addToServicos(servico) {
    $('#dropdownServicosAdd').append($('<option>', {
        value: servico.nome,
        text: servico.nome
    }));
};

function addToLiberar(horario) {
    $('#dropdownServicosDel').append($('<option>', {
        value: horario.title + " " + horario.pet,
        text: horario.title + " " + horario.pet
    }));
}
//adiciona dados iniciais à base. Não é necessária verificação, pois se a ID repetir não adiciona
requestDB.onsuccess = function (event) {
    db = requestDB.result;

    var qntCli = countDb("clientes");
    qntCli.onsuccess = function () {
        for (var i = 0; i < clienteTeste.length; i++) {
            db.transaction(["clientes"], "readwrite")
                .objectStore("clientes").add(clienteTeste[i]);
        }
    }

    var qntAdm = countDb("admins");
    qntAdm.onsuccess = function () //verificando se há admins cadastrados
    {
        db.transaction(["admins"], "readwrite")
            .objectStore("admins").add(adminData[0]);
    }

    var qntServicos = countDb("servicos");
    qntServicos.onsuccess = function () {
        for (var i = 0; i < servicosTeste.length; i++) {
            db.transaction(["servicos"], "readwrite")
                .objectStore("servicos").add(servicosTeste[i]);
        }

    }
    for (var i = 0; i < servicosTeste.length; i++)
        addToServicos(servicosTeste[i]);

    var qntProd = countDb("produtos");
    qntProd.onsuccess = function () {
        for (var i = 0; i < produtosTeste.length; i++) {
            db.transaction(["produtos"], "readwrite")
                .objectStore("produtos").add(produtosTeste[i]);
        }
    }

    qntAnimais = countDb("animais");
    qntAnimais.onsuccess = function () {
        if (qntAnimais.result == 0) //como é incremental a id, sempre vai adicionar a menos que conte a quantidade
            for (var i = 0; i < animaisTeste.length; i++) {
                db.transaction(["animais"], "readwrite")
                    .objectStore("animais").add(animaisTeste[i]);
            }
    }

    qntServicosAtivos = countDb("servicosAtivos");
    var tam = eventos.length;
    qntServicosAtivos.onsuccess = function () {
        if (qntServicosAtivos.result == 0) //como é incremental a id, sempre vai adicionar a menos que conte a quantidade
            for (var i = 0; i < tam; i++) {
                db.transaction(["servicosAtivos"], "readwrite").objectStore("servicosAtivos").add(eventos[i]);
            }
    }
    for (var i = 0; i < tam; i++) {
        addToLiberar(eventos[i]);
    }
    renderAllEvents();
};
//criacao de todas as tabelas
requestDB.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStoreC = db.createObjectStore("clientes", {
        keyPath: "cpf"
    });

    var objectStoreA = db.createObjectStore("admins", {
        keyPath: "cpf"
    });

    var objectStoreP = db.createObjectStore("produtos", {
        keyPath: "barCode"
    });

    var objectStoreAn = db.createObjectStore("animais", {
        keyPath: "id",
        autoIncrement: true
    });

    var objectStoreServ = db.createObjectStore("servicos", {
        keyPath: "nome"
    });
    var objectStoreServA = db.createObjectStore("servicosAtivos", {
        keyPath: "id",
        autoIncrement: true
    });
}
