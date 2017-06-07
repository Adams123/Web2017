/* Membros do Grupo:
Adams Vietro Codignotto da Silva - 6791943
Antonio Pedro Lavezzo Mazzarolo - 8626232
Gustavo Dutra Santana - 8532040
Veronica Vannini - 8517369 */

var carrinho = [];
var row;

function addCliente() {
    var nome = document.getElementById('NomeCli').value;
    var cpf = document.getElementById('CPFCli').value;
    var endereco = document.getElementById('EnderecoCli').value;
    var foto = document.getElementById('FotoCli').value;
    var telefone = document.getElementById('TelCli').value;
    var email = document.getElementById('EmailCli').value;

    requestDB = db.transaction(["clientes"], "readwrite")
        .objectStore("clientes")
        .add({
            name: nome,
            endereco: endereco,
            pass: "cliente",
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

//verifica se um dado cliente já existe na bd
function checkCliente(nomeCliente, senhaCliente) {
    var objectStore = db.transaction("clientes").objectStore("clientes");

    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            if (nomeCliente == cursor.value.name && senhaCliente == cursor.value.pass) {
                var cpf = cursor.value.cpf;
                logon(cpf, 0);
                return false;
            }
            cursor.continue();
        } else {
            alert("Cadastro não encontrado, favor cadastrar através de um admin.");
            return false;
        }
    };
}

function updateCliente() {
    var nome = document.getElementById("ProfileNomeCli").value;
    var endereco = document.getElementById("enderecoCli").value;
    var CPF = document.getElementById("ProfileCPFCli").value;
    var foto = imagem;
    var tel = document.getElementById("telCli").value;
    var email = document.getElementById("emailCli").value;
    var pass = document.getElementById("passCli").value;
    requestDB = db.transaction(["clientes"], "readwrite").objectStore("clientes").put({
        "cpf": CPF,
        "email": email,
        "endereco": endereco,
        "foto": foto,
        "nome": nome,
        "pass": pass,
        "telefone": tel
    });

}

function emptyCart() {
    carrinho = [];
    renderCarrinho();
}

function showCli(cliente) {
    var nome = document.getElementById("ProfileNomeCli");
    var endereco = document.getElementById("enderecoCli");
    var CPF = document.getElementById("ProfileCPFCli");
    var foto = document.getElementById("showFotoCli");
    var tel = document.getElementById("telCli");
    var email = document.getElementById("emailCli");
    var pass = document.getElementById("passCli");
    nome.value = cliente.nome;
    endereco.value = cliente.endereco;
    CPF.value = cliente.cpf
    foto.src = cliente.foto;
    tel.value = cliente.telefone;
    email.value = cliente.email;
    pass.value = cliente.pass;
}

function renderPerfilCli() {
    getKey(whoIsNavigating, "clientes", showCli);
}


function showProdCli(produto) {
    if (checkProdutoCli(produto) == 0) {
        var body = document.getElementById("tableProdutosCli");
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var img = document.createElement('img');
        img.setAttribute("src", produto.foto);
        img.setAttribute("class", "imagem");
        td1.appendChild(img);
        var td2 = document.createElement('td');
        var h31 = document.createElement('h3');
        h31.innerHTML = produto.nome;
        var p1 = document.createElement('p');
        p1.innerHTML = produto.descricao;
        td2.appendChild(h31);
        td2.appendChild(p1);
        var td3 = document.createElement('td');
        var h32 = document.createElement('h3');
        h32.innerHTML = produto.preco;
        td3.innerHTML = "R$";
        td3.appendChild(h32);
        var td4 = document.createElement('td');
        //mais gambi pra facilitar carrinho
        var quant = document.createElement('input');
        quant.setAttribute("type", "number");
        quant.setAttribute("value", "0");
        quant.setAttribute("max", produto.qntEstoque);
        td4.appendChild(quant);
        var td5 = document.createElement('td');
        var button = document.createElement('input');
        button.setAttribute("type", "submit");
        button.setAttribute("class", "submits");
        button.setAttribute("value", "Adicionar ao carrinho");
        button.setAttribute("id", "prod" + produto.barCode);
        button.setAttribute("onclick", "addToCart($(this).get(0).id,row)");
        td5.appendChild(button);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.addEventListener("click", function () {
            row = $(this).find('td:nth-child(4) input').val();
        });
        body.appendChild(tr);
    }
}



function renderProdutos() {
    $("#tableProdutosCli td").remove(); //destroi tabela e remonta
    listAllItems("produtos", showProdCli);
}

function checkProdutoCli(produto) {
    var exists = 0;
    $('#tableProdutosCli td:nth-child(4)').each(function () {
        var cellText = $(this).get(0).id;
        if (strcmp("prod" + produto.barCode, cellText) == 0) {
            exists = 1;
        }
    });
    return exists;
}

function checkCarrinho(code) {
    for (var i = 0; i < carrinho.length; i++) {
        if (Number(carrinho[i].produto.barCode) == Number(code)) {
            return i;
        }
    }
    return -1;
}

function addToCart(code, qnt) {
    code = code.replace("prod", "");
    var transaction = db.transaction(["produtos"], "readwrite");
    var objectStore = transaction.objectStore("produtos");
    requestDB = objectStore.get(Number(code));
    requestDB.onsuccess = function (event) {
        if (requestDB.result) {
            var pos = checkCarrinho(code);
            if (Number(pos) == -1) {
                carrinho.push({
                    "produto": requestDB.result,
                    "qnt": qnt
                });
            } else {
                carrinho[Number(pos)].qnt = Number(Number(carrinho[pos].qnt) + Number(qnt));
            }
        }
    };

}

function showCarrinho() {
    var body = document.getElementById("tableCarrinhoCli");
    var totalCli = 0;
    for (var i = 0; i < carrinho.length; i++) {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var img = document.createElement('img');
        img.setAttribute("src", carrinho[i].produto.foto);
        img.setAttribute("class", "imagem");
        td1.appendChild(img);
        tr.appendChild(td1);
        var td2 = document.createElement('td');
        var h3 = document.createElement('h3');
        h3.innerHTML = carrinho[i].produto.nome;
        td2.appendChild(h3);
        tr.appendChild(td2);
        var td3 = document.createElement('td');
        var qntProd = document.createElement('input');
        qntProd.setAttribute("type", "number");
        qntProd.disabled = true;
        qntProd.setAttribute("value", carrinho[i].qnt);
        td3.appendChild(qntProd);
        tr.appendChild(td3);
        var td4 = document.createElement('td');
        var precoUni = document.createElement('input');
        precoUni.setAttribute("type", "number");
        precoUni.setAttribute("value", carrinho[i].produto.preco);
        precoUni.disabled = true;
        td4.appendChild(precoUni);
        tr.appendChild(td4);
        var td5 = document.createElement('td');
        var total = document.createElement('input');
        total.setAttribute("type", "number");
        var precoCompra = parseFloat(carrinho[i].produto.preco) * parseFloat(carrinho[i].qnt);
        precoCompra.disabled = true;
        total.setAttribute("value", parseFloat(precoCompra).toFixed(2));
        total.disabled = true;
        totalCli = parseFloat(parseFloat(totalCli) + parseFloat(precoCompra)).toFixed(2);
        td5.appendChild(total);
        tr.appendChild(td5);
        body.appendChild(tr);
    }
    $('#totalCart').val(parseFloat(totalCli));
}

function renderCarrinho() {
    $("#tableCarrinhoCli td").remove(); //destroi tabela e remonta
    showCarrinho();
}

function removeQntProd(qnt, prod) {
    requestDB = db.transaction(["produtos"], "readwrite")
        .objectStore("produtos")
        .put({
            barCode: prod.barCode,
            nome: prod.nome,
            foto: prod.foto,
            descricao: prod.descricao,
            preco: prod.preco,
            qntEstoque: Number(prod.qntEstoque) - Number(qnt),
            qntVend: Number(prod.qntVend) + Number(qnt)
        });
}

function comprar() {
    for (var i = 0; i < carrinho.length; i++)
        removeQntProd(carrinho[i].qnt, carrinho[i].produto);
    carrinho = [];
    emptyCart();
}
