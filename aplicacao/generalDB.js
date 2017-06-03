//procura na store definida um objeto com a id e aplica a função getFunc sobre o objeto (como update ou delete)
function getKey(id, store, getFunc) {
    var transaction = db.transaction([store], "readwrite");
    var objectStore = transaction.objectStore(store);
    requestDB = objectStore.get(id);
    requestDB.onerror = function (event) {
        alert("Unable to retrieve data from database!");
    };
    requestDB.onsuccess = function (event) {
        if (requestDB.result) {
            getFunc(requestDB.result);
        } else {
            console.log("Kenny couldn't be found in your database!");
        }
    };
}

//adiciona uma chave com id, da tabela store, dado uma lista vazia, e uma função para criar um ojeto e pushar ele na lista (como o returnProd)
function addKey(id, store, lista, getFunc) {
    var transaction = db.transaction([store], "readwrite");
    var objectStore = transaction.objectStore(store);
    requestDB = objectStore.get(id);
    requestDB.onerror = function (event) {
        alert("Unable to retrieve data from database!");
    };
    requestDB.onsuccess = function (event) {
        if (requestDB.result) {
            getFunc(requestDB.result, lista);
        } else {
            console.log("Kenny couldn't be found in your database!");
        }
    };
}
//verifica se um elemento com id foi inserido em uma tabela
//parametros: id do objeto, id da tabela (string)
function checkDone(id, tabela)
{
    var tab = "#"+tabela+" tr";
    console.log("Verificando " + id + " " + tab);
    var done = 0;
    $(tab).each(function () {
        $(this).find('td:first-of-type').each(function () {
            if ($(this).text().localeCompare(id.toString()) == 0) done = 1;

        })
    })
    return done;
}
