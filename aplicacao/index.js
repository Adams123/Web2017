function showLogin() {
	document.getElementById("formLogin").style.display = 'inline-block';
	document.getElementById("bemvindo").style.display = 'none';
}

function showHome() {
	document.getElementById("formLogin").style.display = 'none';
	document.getElementById("bemvindo").style.display = 'inline-block';
	document.getElementById("cliente").style.display = 'none';
	document.getElementById("admin").style.display = 'none';
}

function navCliente() {
	document.getElementById("produtos").style.display = 'inline-block';
	document.getElementById("calendario").style.display = 'inline-block';
	document.getElementById("login").style.display = 'none';
	document.getElementById("profile").style.display = 'inline-block';
}

function navAdmin() {
	document.getElementById("cadastrar").style.display = 'inline-block';
	document.getElementById("servicos").style.display = 'inline-block';
	document.getElementById("login").style.display = 'none';
	document.getElementById("profile").style.display = 'inline-block';
}

function logon(nomeCliente, senhaCliente) {
	let divLogin = document.getElementById("formLogin");
	divLogin.outerHTML = "";

	if (nomeCliente == 'admin' && senhaCliente == 'admin'){
		loginAdmin();
	}else{
		loginCliente(nomeCliente);
	}
}

function loginAdmin(){
	let divAdmin = document.getElementById("admin");
	divAdmin.innerHTML = "<h1>Bem vindo, Admin</h1>";
	divAdmin.style.display = 'inline-block';
	navAdmin();
}

function loginCliente(nomeCliente){
	let divCliente = document.getElementById("cliente");
	divCliente.innerHTML = "<h1>Bem vindo, "+ nomeCliente + "</h1>";
	divCliente.style.display = 'inline-block';
	navCliente();
}