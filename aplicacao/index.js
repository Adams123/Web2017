// Membros do Grupo:
// * Adams Vietro Codignotto da Silva - 6791943
// * Antonio Pedro Lavezzo Mazzarolo - 8626232
// * Gustavo Dutra Santana - 8532040
// * Veronica Vannini - 8517369

var whoIsNavigating;

// Funcao para mudar a visualização ao fazer o logout
function confirmLogout(choice) {
    if (choice == true) {
        $("#navBarHome").show();
        $("#navBarAdmin").hide();
        $("#navBarCliente").hide();
    }
}

function strcmp(a, b) {
    return (a < b ? -1 : (a > b ? 1 : 0));
}
// verificacao de admin ou cliente
function logon(cpf, isAdmin) {
    whoIsNavigating = cpf;
    if (isAdmin) {
        loginAdmin();
    } else {
        loginCliente();
    }
}

//configura exibicao para admin
function loginAdmin() {
    $("#navBarAdmin").show();
    $("#navBarHome").hide();
}
//configura exibicao para cliente
function loginCliente() {
    $("#navBarCliente").show();
    $("#navBarHome").hide();

    whoIsNavigating = "182-03-0311";
}

//toggable e toggable2 são variáveis usadas para realizar a navegação entre as abas, sendo associadas às abas e seus respectivos conteúdos
$(document).ready(function () {
    var toggable = $("[data-toggable]");
    $("[data-toggle]").each(function () {
        var tab = $($(this).attr('href'));
        $(this).click(function () {
            toggable.hide();
            tab.show();
        });
    });

    toggable.hide();
    $("#home").show();

    var toggable2 = $("[data-toggable2]");
    $("[data-toggle2]").each(function () {
        var tab = $($(this).attr('href'));
        $(this).click(function () {
            toggable2.hide();
            tab.show();
        });
    });

    toggable2.hide();

    //---------------- customizacao do plugin do calendário
    $('.calendar').fullCalendar({
        weekends: false,
        defaultView: 'agendaWeek',
        businessHours: {
            dow: [1, 2, 3, 4, 5], // Monday - Friday
            start: '08:00',
            end: '18:00',
        },
        allDaySlot: false,
        dayClick: function (date, jsEvent, view) {
            alert('Clicked on: ' + date.format('DD/MM/YYYY HH:mm'));

            var modal = document.getElementById('myModal');
            modal.style.display = "block";

            var span = document.getElementsByClassName("close")[0];
            span.onclick = function () {
                modal.style.display = "none";
            }
        }
    });

    //------------------adicionando listener ao dropdown de servico
    var selectServ = document.getElementById('dropdownServicosDel');
    selectServ.addEventListener('change', function () {
        var selecionada = this.options[this.selectedIndex];
        var url = selecionada.getAttribute('value');
        setValuesServ(url);
    });
});

//pega todos os eventos da tabela do calendário e renderiza no calendário
function renderAllEvents() {
    var trans = db.transaction("servicosAtivos", IDBTransaction.READ_ONLY);
    var store = trans.objectStore("servicosAtivos");
    var items = [];

    var cursorRequest = store.openCursor();

    cursorRequest.onerror = function (error) {
        console.log(error);
    };

    cursorRequest.onsuccess = function (evt) {
        var cursor = evt.target.result;
        if (cursor) {
            items.push(cursor.value);
            $('.calendar').fullCalendar('renderEvent', cursor.value, true);
            cursor.continue();
        }
    };
}


//cria o
function setValuesServ(servicoPet) {
    var key;
    var trans = db.transaction("servicosAtivos", IDBTransaction.READ_ONLY);
    var store = trans.objectStore("servicosAtivos");

    var cursorRequest = store.openCursor();

    cursorRequest.onerror = function (error) {
        console.log(error);
    };

    cursorRequest.onsuccess = function (evt) {
        var cursor = evt.target.result;
        if (cursor) {
            key = cursor.value.title + " " + cursor.value.pet;
            if (strcmp(key, servicoPet) == 0) //achou
            {
                showDataServDel(cursor.value);
                return;
            }
            cursor.continue();
        } else console.log("Nao achou " + key);
    };
}

function showDataServDel(servicoPet) {
    $('#dataServDel').val(servicoPet.start.split('T')[0]);
    $('#tempServDel').val(servicoPet.start.split('T')[1]);

}
//usa a imagem do upload em source para exibir em dest
function previewFile(source, dest) {

    var file = source.files[0];
    var preview = dest;
    var reader = new FileReader();

    reader.addEventListener("load", function () {
        preview.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

//busca na bd pelo servico selecionado
function desmarcarServico() {
    var servicoPet = $("#dropdownServicosDel option:selected").text();
    var key;
    var trans = db.transaction("servicosAtivos", IDBTransaction.READ_ONLY);
    var store = trans.objectStore("servicosAtivos");

    var cursorRequest = store.openCursor();

    cursorRequest.onerror = function (error) {
        console.log(error);
    };

    cursorRequest.onsuccess = function (evt) {
        var cursor = evt.target.result;
        if (cursor) {
            key = cursor.value.title + " " + cursor.value.pet;
            if (strcmp(key, servicoPet) == 0) //achou
            {
                deleteServicoAtivo(cursor.value.id);
                return;
            }
            cursor.continue();
        } else console.log("Nao achou " + key);
    };
}

//remove servico da bd e do calendário
function deleteServicoAtivo(id) {
    requestDB = db.transaction(["servicosAtivos"], "readwrite")
        .objectStore("servicosAtivos")
        .delete(Number(id));

    requestDB.onsuccess = function () {
        console.log("Removido " + id);
    };
    requestDB.onerror = function () {
        console.log("Erro ao remover");
    };

    $('.calendar').fullCalendar('removeEvents', Number(id));
}

Date.prototype.addHours = function (h) {
    this.setHours(this.getHours() + h);
    return this;
}
// ta com pau, se adicionar com nome já existente da merda, mas n vo arrumar agora
function adicionarServAssoc() {
    var petid = $('#petsServicos option:selected').attr('id');
    petid = petid.replace("pet", "");
    getKey(Number(petid), "animais", addServAssoc);
}

//adiciona servico do pet na bd
function addServAssoc(pet) {

    var d = $('#dataServ').val() + ' ' + $('#tempServ').val();
    d = new Date(d);
    var datestring = (d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2));
    var timestring = "T" + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    var timestring1 = "T" + ("0" + (d.getHours() + 1)).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

    var e = {
        "allDay": false,
        "start": datestring + timestring,
        "end": datestring + timestring1,
        "pet": pet.nome,
        "title": $('#dropdownServicosAdd option:selected').text(),
        "url": pet.foto
    };
    var trans = db.transaction(["servicosAtivos"], "readwrite");
    requestDB = trans.objectStore("servicosAtivos")
        .add(e);
    requestDB.onsuccess = function (event) {
        e.id = event.target.result; //adiciona a id ao objeto antes de salvar no calendario
        $('.calendar').fullCalendar('renderEvent', e, true);
        addToLiberar(e); //adiciona ao menu dropdown de horarios a serem liberados
    }

}
