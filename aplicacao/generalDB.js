// Membros do Grupo:
// * Adams Vietro Codignotto da Silva - 6791943
// * Antonio Pedro Lavezzo Mazzarolo - 8626232
// * Gustavo Dutra Santana - 8532040
// * Veronica Vannini - 8517369

//procura na store definida um objeto com a id e aplica a função getFunc sobre o objeto (como update ou delete)
function getKey(id, store, getFunc) {
    var transaction = db.transaction([store], "readwrite");
    var objectStore = transaction.objectStore(store);
    requestDB = objectStore.get(id);
    requestDB.onerror = function (event) {
        alert("Não foi possível conectar à base.");
    };
    requestDB.onsuccess = function (event) {
        if (requestDB.result) {
            getFunc(requestDB.result);
        } else {
            console.log("Não foi possível encontrar o produto.");
        }
    };
}

//percorre uma base (storeName) e usa a função de exibição passada showFunc para exibir todos os dados. Note que a showFunc tem que verificar se o objeto já foi adicionado, senão cada vez que clicar ele readiciona tudo
function listAllItems(storeName, showFunc) {
    var trans = db.transaction(storeName, IDBTransaction.READ_ONLY);
    var store = trans.objectStore(storeName);
    var items = [];
    var id = store.keyPath;
    trans.oncomplete = function (evt) {};

    var cursorRequest = store.openCursor();

    cursorRequest.onerror = function (error) {
        console.log(error);
    };

    cursorRequest.onsuccess = function (evt) {
        var cursor = evt.target.result;
        if (cursor) {
            items.push(cursor.value);
            cursor.continue();
        } else {
            var len = items.length;
            for (var j = 0; j < len; j++) { //evita ficar readicionando html toda vez q abrir a aba
                showFunc(items[j]);
            }
        }
    };
}

//verifica se uma key ta na tabela
function checkInTable(table, key) {
    var exists = 0;
    $('#' + table + ' tr td:first-child').each(function () {
        var cellText = $(this).html();
        if (strcmp(key, cellText) == 0) {
            exists = 1;
        }
    });
    return exists;
}

function checkInTableh2(table, key) {
    var exists = 0;
    $('#' + table + ' tr td:first-child h2').each(function () {
        var cellText = $(this).html();
        if (strcmp(key, cellText) == 0) {
            exists = 1;
        }
    });
    return exists;
}
