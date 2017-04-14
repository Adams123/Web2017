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
}

function loginCliente(nomeCliente){
	let divCliente = document.getElementById("cliente");
	divCliente.innerHTML = "<h1>Bem vindo, "+ nomeCliente + "</h1>";
}