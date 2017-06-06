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

    whoIsNavigating = "10000000000";
}
//configura exibicao para cliente
function loginCliente() {
    $("#navBarCliente").show();
    $("#navBarHome").hide();
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
    var select = document.getElementById('dropdownServicosDel');
    select.addEventListener('change', function () {
        var selecionada = this.options[this.selectedIndex];
        var url = selecionada.getAttribute('value');
        setValuesServ(url);
    });
});

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
