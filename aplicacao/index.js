function closeAll() {
    document.getElementById("bemvindo").style.display = 'none';
    document.getElementById("cliente").style.display = 'none';
    document.getElementById("admin").style.display = 'none';
    document.getElementById("confirmacao").style.display = 'none';
    document.getElementById("pets").style.display = 'none';
}

function confirmLogout(choice) {
    if (choice == true)
    {
        $("#navBarHome").show();
        $("#navBarAdmin").hide();
        $("#navBarCliente").hide();
    }
    else
    {
        $('.confirm').hide();
    }
}

function showProfile() {
    closeAll();
    document.getElementById("pets").style.display = 'inline-block';
}

function navCliente() {
    $("#produtos").style.display = 'inline-block';
    $("#calendario").style.display = 'inline-block';
    $("#login").style.display = 'none';
    $("#profile").style.display = 'inline-block';
    $("#logout").style.display = 'inline-block';
}

function logon(nomeCliente, senhaCliente) {
    if (nomeCliente == 'admin' && senhaCliente == 'admin') {
        loginAdmin();
    } else {
        loginCliente(nomeCliente);
    }
}

function loginAdmin(){
        $("#navBarHome").hide();
        $("#navBarAdmin").show();
}
function loginCliente(nomeCliente) {
    let divCliente = document.getElementById("homeCliente");
    $("#navBarCliente").show();
    $("#navBarHome").hide();
}
