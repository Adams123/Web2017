window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
    window.alert("Seu browser não suporta IndexedDB.");
}

const adminData = [
    {
        name: "admin",
        pass: "admin",
        cpf: "10000000000",
        foto: null,
        telefone: "12312313",
        email: "teste@gmail.com"
    }
];

window.indexedDB.deleteDatabase("PetShopDB, 1");

var db;
var qntAnimais, qntServicos;
var requestDB = window.indexedDB.open("PetShopDB", 1);
requestDB.onerror = function (event) {
    console.log("Erro ao conectar na base");
};

function countDb(basename)
{
    var qnt = db.transaction([basename.toString()], "readwrite")
        .objectStore(basename.toString()).count();
    return qnt;
}
//caso necessario adiciona dados às base
requestDB.onsuccess = function (event) {
    db = requestDB.result;
   // console.log("Contando cliente");

   // var qnt = countDb("clientes");

    console.log("Contando admin");

    var qntAdm = countDb("admins");

    qntAdm.onsuccess = function () //verificando se há admins cadastrados
    {
        if (qntAdm.result == 0) {
            db.transaction(["admins"], "readwrite")
                .objectStore("admins").add(adminData[0]);
		}
    }
    qntAnimais = countDb("animais");
    qntServicos = countDb("servicos");

    //console.log("contando produtos");

   // var qntPod = countDb("produtos");
};
//criacao de todas as tabelas
requestDB.onupgradeneeded = function (event) {
    console.log("Criando cliente");
    var db = event.target.result;
    var objectStoreC = db.createObjectStore("clientes", {
        keyPath: "cpf"
    });

    console.log("Criando admin");

    var objectStoreA = db.createObjectStore("admins", {
        keyPath: "cpf"
    });

    console.log("Criando produtos");

    var objectStoreP = db.createObjectStore("produtos", {
        keyPath: "barCode"
    });

    console.log("Criando animais");

    var objectStoreAn = db.createObjectStore("animais", {
        keyPath: "id", autoIncrement:true
    });

    console.log("Criando servicos");

    var objectStoreServ = db.createObjectStore("servicos", {
        keyPath: "id", autoIncrement:true
    });
}
