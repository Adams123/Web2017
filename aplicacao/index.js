function showLogin() {
	document.getElementById("formLogin").style.display = 'inline-block';
	document.getElementById("bemvindo").style.display = 'none';
}

function confirmLogout(choice) {
	if (choice == true) {
		document.getElementById("produtos").style.display = 'none';
		document.getElementById("calendario").style.display = 'none';
		document.getElementById("cadastrar").style.display = 'none';
		document.getElementById("servicos").style.display = 'none';
		document.getElementById("login").style.display = 'inline-block';
		document.getElementById("profile").style.display = 'none';
		document.getElementById("logout").style.display = 'none';
	}
	
	document.getElementById("confirmacao").style.display = 'none';
	showHome();
}

function showLogout() {
	document.getElementById("confirmacao").style.display = 'inline-block';
	document.getElementById("admin").style.display = 'none';
	document.getElementById("cliente").style.display = 'none';
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
	document.getElementById("logout").style.display = 'inline-block';
}

function navAdmin() {
	document.getElementById("cadastrar").style.display = 'inline-block';
	document.getElementById("servicos").style.display = 'inline-block';
	document.getElementById("login").style.display = 'none';
	document.getElementById("profile").style.display = 'inline-block';
	document.getElementById("logout").style.display = 'inline-block';
}

function logon(nomeCliente, senhaCliente) {
	document.getElementById("formLogin").style.display = 'none';

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