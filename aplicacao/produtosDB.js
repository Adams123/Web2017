/* Membros do Grupo:
Adams Vietro Codignotto da Silva - 6791943
Antonio Pedro Lavezzo Mazzarolo - 8626232
Gustavo Dutra Santana - 8532040
Veronica Vannini - 8517369 */



//adiciona um produto à base produtos
function addProd() {
    var nome = document.getElementById('nomeProdAdd').value;
    var barCode = document.getElementById('idProdAdd').value;
    barCode = Number(barCode);
    var foto = imagem;
    var descricao = document.getElementById('descricaoProdAdd').value;
    var preco = document.getElementById('precoProdAdd').value;
    var qntEstoque = document.getElementById('quantProdAdd').value;
    var qntVend = document.getElementById('vendasProdAdd').value;

    requestDB = db.transaction(["produtos"], "readwrite")
        .objectStore("produtos")
        .add({
            nome: nome,
            barCode: barCode,
            foto: foto,
            descricao: descricao,
            preco: preco,
            qntEstoque: qntEstoque,
            qntVend: qntVend
        });

    requestDB.onsuccess = function () {
        console.log("Adicionado " + nome);
        alert(nome + " foi adicionado com sucesso!");
    };
    requestDB.onerror = function () {
        console.log("Erro");
        alert("Falha ao adicionar " + nome + ".");
    };


}
//pega informações do produto, baseado se é pra deletar ou atualizar
function getProdInfo(tab) {
    if (tab == "del") {
        getKey(Number(document.getElementById("idProdDel").value), "produtos", getProdDel);
    } else {
        getKey(Number(document.getElementById("idProdAtt").value), "produtos", getProdAtt);
    }
}


//exibe o produto a ser atualizado, apenas setando os valores nos repectivos campos
function getProdAtt(prod) {

    var nome = document.getElementById('nomeProdAtt');
    var foto = document.getElementById('imgProdAtt');
    var descricao = document.getElementById('descricaoProdAtt');
    var preco = document.getElementById('precoProdAtt');
    var qntEstoque = document.getElementById('quantProdAtt');
    var qntVend = document.getElementById('vendasProdAtt');
    nome.value = prod.nome;
    foto.src = prod.foto;
    descricao.value = prod.descricao;
    preco.value = prod.preco;
    qntEstoque.value = prod.qntEstoque;
    qntVend.value = prod.qntVend;
}

//exibe o produto a ser delatado, apenas setando os valores nos repectivos campos
function getProdDel(prod) {

    var nome = document.getElementById('nomeProdDel');
    var foto = document.getElementById('imgProdDel');
    var descricao = document.getElementById('descricaoProdDel');
    var preco = document.getElementById('precoProdDel');
    var qntEstoque = document.getElementById('quantProdDel');
    var qntVend = document.getElementById('vendasProdDel');
    nome.value = prod.nome;
    foto.src = prod.foto;
    descricao.value = prod.descricao;
    preco.value = prod.preco;
    qntEstoque.value = prod.qntEstoque;
    qntVend.value = prod.qntVend;
}


//atualiza um produto através da função put, pegando a id já existente do produto
function updateProd() {
    var barCode = document.getElementById('idProdAtt').value;
    var nome = document.getElementById('nomeProdAtt').value;
    var descricao = document.getElementById('descricaoProdAtt').value;
    var preco = document.getElementById('precoProdAtt').value;
    var qntEstoque = document.getElementById('quantProdAtt').value;
    var qntVend = document.getElementById('vendasProdAtt').value;
    var foto = imagem;
    requestDB = db.transaction(["produtos"], "readwrite")
        .objectStore("produtos")
        .put({
            barCode: barCode,
            nome: nome,
            foto: foto,
            descricao: descricao,
            preco: preco,
            qntEstoque: qntEstoque,
            qntVend: qntVend
        });

    requestDB.onsuccess = function () {
        console.log("Adicionado " + nome);
        alert(nome + " foi adicionado com sucesso!");
    };
    requestDB.onerror = function () {
        console.log("Erro");
        alert("Falha ao adicionar " + nome + ".");
    };
}


//remove um produto com a id no campo idProdDel
function removeProd() {
    var id = document.getElementById("idProdDel").value;
    requestDB = db.transaction(["produtos"], "readwrite")
        .objectStore("produtos")
        .delete(Number(id));

    requestDB.onsuccess = function () {
        console.log("Removido " + id);
    };
    requestDB.onerror = function () {
        console.log("Erro ao remover");
    };
}


//adiciona um produto à lista de produtos
function returnProd(prod, lista) {
    var produto = {
        barCode: prod.barCode,
        nome: prod.nome,
        foto: prod.foto,
        descricao: prod.descricao,
        preco: prod.preco,
        qntEstoque: prod.qntEstoque,
        qntVend: prod.qntVend
    };
    lista.push(produto);
}


//monta uma row da tabela de produto
function showProd(produto) {
    if (checkInTable("tableProd", produto.barCode) == 0) {
        var body = document.getElementById("tableProd");
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        td1.innerHTML = produto.barCode;
        var td2 = document.createElement('td');
        var img = document.createElement('img');
        img.src = produto.foto;
        td2.appendChild(img);
        img.setAttribute("width", "150px");
        img.setAttribute("height", "150px");
        var td3 = document.createElement('td');
        var h3n = document.createElement('h3');
        h3n.innerHTML = produto.nome;
        td3.appendChild(h3n);
        var td4 = document.createElement('td');
        td4.innerHTML = produto.descricao;
        var td5 = document.createElement('td');
        var h3p = document.createElement('h3');
        h3p.innerHTML = "R$" + parseFloat(produto.preco).toFixed(2);
        td5.appendChild(h3p);
        var td6 = document.createElement('td');
        var inputQntD = document.createElement('h3');
        inputQntD.innerHTML = produto.qntEstoque;
        td6.appendChild(inputQntD);
        var td7 = document.createElement('td');
        var inputQntV = document.createElement('h3');
        inputQntV.innerHTML = produto.qntVend;
        td7.appendChild(inputQntV);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        body.appendChild(tr);
    }
}

function readAllProds() {
    $("#tableProd td").remove(); //destroi tabela e remonta
    listAllItems("produtos", showProd);
}
