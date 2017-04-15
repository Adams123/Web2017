function logon(nomeCliente, senhaCliente) {
    let divLogin = document.getElementById("formLogin");
    divLogin.outerHTML = "";

    if (nomeCliente == 'admin' && senhaCliente == 'admin') {
        loginAdmin();
    } else {
        loginCliente(nomeCliente);
    }
}

function loginAdmin() {
    let divAdmin = document.getElementById("admin");
    divAdmin.style.display = 'inline';
    let divLogin = document.getElementById("login");
    divLogin.style.display = 'none';
}

function loginCliente(nomeCliente) {
    let divCliente = document.getElementById("cliente");
    divCliente.innerHTML = "<h1>Bem vindo, " + nomeCliente + "</h1>";
}

//faz com que quando clique em uma tab do admin ela exiba o conteudo
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    var target = this.href.split('#');
    $('.nav a').filter('[href="#' + target[1] + '"]').tab('show');
})
