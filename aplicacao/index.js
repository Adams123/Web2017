function showLogin() {
	// var node = document.createElement("FORM");
	// node.id = "formLogin";
	// node.createTextNode("Login:");
	// var input = document.createElement("INPUT");
	// input.type = "text";
	// input.name = "login";
	// input.id = "user";
	// node.appendChild(input);
	// var br = document.createElement("BR");
	// node.appendChild(br);
	// node.createTextNode("Senha:");
	// var input = document.createElement("INPUT");
	// input.type = "password";
	// input.id = "senha";
	// node.appendChild(input);
	// var br = document.createElement("BR");
	// node.appendChild(br);
	// var button = document.createElement("BUTTON");
	// button.onclick = "logon(document.getElementById('user').value, document.getElementById('senha').value)";
	// button.createTextNode("Entrar");
	// node.appendChild(button);
	
	// let login = document.getElementById("login");
	// login.appendChild(node);
	// node.submit();
}

function navCliente() {
	let navBar = document.getElementById("navigationBar");
	navBar.removeChild(navBar.childNodes[4]);
	navBar.removeChild(navBar.childNodes[3]);
	
	var node = document.createElement("LI");
	var a = document.createElement("A");
	a.id = "produtos";
	a.href = "#";
	var texta = document.createTextNode("Produtos");
	a.appendChild(texta);
	node.appendChild(a);
	navBar.appendChild(node);
	
	var node = document.createElement("LI");
	var a = document.createElement("A");
	a.id = "calendario";
	a.href = "#";
	var texta = document.createTextNode("Calendário");
	a.appendChild(texta);
	node.appendChild(a);
	navBar.appendChild(node);

	var node = document.createElement("LI");
	var a = document.createElement("A");
	a.id = "login";
	a.href = "#";
	var texta = document.createTextNode("Profile");
	a.appendChild(texta);
	node.appendChild(a);
	navBar.appendChild(node);
}

function navAdmin() {
	let navBar = document.getElementById("navigationBar");
	navBar.removeChild(navBar.childNodes[4]);
	navBar.removeChild(navBar.childNodes[3]);
	
	var node = document.createElement("LI");
	var a = document.createElement("A");
	a.id = "cadastrar";
	a.href = "#";
	var texta = document.createTextNode("Cadastrar");
	a.appendChild(texta);
	node.appendChild(a);
	navBar.appendChild(node);
	
	var node = document.createElement("LI");
	var a = document.createElement("A");
	a.id = "servicos";
	a.href = "#";
	var texta = document.createTextNode("Serviços");
	a.appendChild(texta);
	node.appendChild(a);
	navBar.appendChild(node);

	var node = document.createElement("LI");
	var a = document.createElement("A");
	a.id = "login";
	a.href = "#";
	var texta = document.createTextNode("Profile");
	a.appendChild(texta);
	node.appendChild(a);
	navBar.appendChild(node);	
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
	navAdmin();
}

function loginCliente(nomeCliente){
	let divCliente = document.getElementById("cliente");
	divCliente.innerHTML = "<h1>Bem vindo, "+ nomeCliente + "</h1>";
	navCliente();
}