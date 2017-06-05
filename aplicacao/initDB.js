window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
    window.alert("Seu browser não suporta IndexedDB.");
}

window.indexedDB.deleteDatabase("PetShopDB, 1");

var db;
var qntAnimais, qntServicos;
var requestDB = window.indexedDB.open("PetShopDB", 1);
requestDB.onerror = function (event) {
    console.log("Erro ao conectar na base");
};

function countDb(store) {
    var store = db.transaction([store], "readonly").objectStore(store);
    var qnt = store.count();
    return qnt;
}
//caso necessario adiciona dados às base
requestDB.onsuccess = function (event) {
    db = requestDB.result;

    var qntCli = countDb("clientes");
    qntCli.onsuccess = function()
    {
        for(var i=0;i<clienteTeste.length;i++)
            {
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

    qntAnimais = countDb("animais");
    qntAnimais.onsuccess = function()
    {
        if(qntAnimais.result==0)//como é incremental a id, sempre vai adicionar a menos que conte a quantidade
        for(var i=0;i<animaisTeste.length;i++)
            {
                db.transaction(["animais"], "readwrite")
            .objectStore("animais").add(animaisTeste[i]);
            }
    }

    qntServicos = countDb("servicos");
    qntServicos.onsuccess = function()
    {
        if(qntServicos.result==0)//como é incremental a id, sempre vai adicionar a menos que conte a quantidade
        for(var i=0;i<servicosTeste.length;i++)
            {
                db.transaction(["servicos"], "readwrite")
            .objectStore("servicos").add(servicosTeste[i]);
            }
    }

    var qntProd = countDb("produtos");
    qntProd.onsuccess = function()
    {
        for(var i=0;i<produtosTeste.length;i++)
            {
                db.transaction(["produtos"], "readwrite")
            .objectStore("produtos").add(produtosTeste[i]);
            }
    }
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
        keyPath: "id",
        autoIncrement: true
    });
}
