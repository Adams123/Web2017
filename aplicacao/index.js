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

// verificacao de admin ou cliente
function logon(cpf, isAdmin) {
    if (isAdmin) {
        loginAdmin();
    } else {
        loginCliente();
    }
	whoIsNavigating = cpf;
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
        // slotDuration: '01:00:00',
        events: [{
                title: 'Vacina Pet - Pet: Pipoca',
                url: 'https://www.veterinariamatogrosso.com.br/uploads/images/2016/12/6-1480591557.jpg',
                start: '2017-04-12T08:00:00',
                end: '2017-04-12T09:00:00',
                allDay: false
			},
            {
                title: 'Banho Pet - Pet: Godofredo',
                url: 'http://petshopbigdogsbrasil.com.br/site/uploads/banho-e-tosa/banho-medicamentoso/banho-cachorro-petitobi.jpg',
                start: '2017-04-10T12:00:00',
                end: '2017-04-10T13:00:00',
                allDay: false
		   },
            {
                title: 'Vacina Pet - Pet: Pipoca',
                url: 'https://www.veterinariamatogrosso.com.br/uploads/images/2016/12/6-1480591557.jpg',
                start: '2017-04-17T08:00:00',
                end: '2017-04-17T09:00:00',
                allDay: false
			},
            {
                title: 'Banho Pet - Pet: Godofredo',
                url: 'http://petshopbigdogsbrasil.com.br/site/uploads/banho-e-tosa/banho-medicamentoso/banho-cachorro-petitobi.jpg',
                start: '2017-04-19T12:00:00',
                end: '2017-04-19T13:00:00',
                allDay: false
		   },
            {
                title: 'Vacina Pet - Pet: Pipoca',
                url: 'https://www.veterinariamatogrosso.com.br/uploads/images/2016/12/6-1480591557.jpg',
                start: '2017-04-24T08:00:00',
                end: '2017-04-24T09:00:00',
                allDay: false
			},
            {
                title: 'Banho Pet - Pet: Godofredo',
                url: 'http://petshopbigdogsbrasil.com.br/site/uploads/banho-e-tosa/banho-medicamentoso/banho-cachorro-petitobi.jpg',
                start: '2017-04-26T12:00:00',
                end: '2017-04-26T13:00:00',
                allDay: false
		   },
            {
                title: 'Vacina Pet - Pet: Pipoca',
                url: 'https://www.veterinariamatogrosso.com.br/uploads/images/2016/12/6-1480591557.jpg',
                start: '2017-05-01T08:00:00',
                end: '2017-05-01T09:00:00',
                allDay: false
			},
            {
                title: 'Banho Pet - Pet: Godofredo',
                url: 'http://petshopbigdogsbrasil.com.br/site/uploads/banho-e-tosa/banho-medicamentoso/banho-cachorro-petitobi.jpg',
                start: '2017-05-04T12:00:00',
                end: '2017-05-04T13:00:00',
                allDay: false
		   },
            {
                title: 'Vacina Pet - Pet: Pipoca',
                url: 'https://www.veterinariamatogrosso.com.br/uploads/images/2016/12/6-1480591557.jpg',
                start: '2017-05-09T08:00:00',
                end: '2017-05-09T09:00:00',
                allDay: false
			},
            {
                title: 'Banho Pet - Pet: Godofredo',
                url: 'http://petshopbigdogsbrasil.com.br/site/uploads/banho-e-tosa/banho-medicamentoso/banho-cachorro-petitobi.jpg',
                start: '2017-05-12T12:00:00',
                end: '2017-05-12T13:00:00',
                allDay: false
		   }
		],
        dayClick: function (date, jsEvent, view) {
            alert('Clicked on: ' + date.format('DD/MM/YYYY HH:mm'));

            var modal = document.getElementById('myModal');
            modal.style.display = "block";

            var span = document.getElementsByClassName("close")[0];
            span.onclick = function () {
                modal.style.display = "none";
            }

        }
    })
});

function previewFile(source, dest)
{
  /*
  var file = source.files[0];
  var preview = dest;
  var reader  = new FileReader();

  reader.addEventListener("load", function () {
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }*/
}
