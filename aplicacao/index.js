// Membros do Grupo:
// * Adams Vietro Codignotto da Silva - 6791943
// * Antonio Pedro Lavezzo Mazzarolo - 8626232
// * Gustavo Dutra Santana - 8532040
// * Veronica Vannini - 8517369

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

function logon(nomeCliente, senhaCliente) {
    if (nomeCliente == 'admin' && senhaCliente == 'admin') {
        loginAdmin();
    } else {
        loginCliente(nomeCliente);
    }
}

function loginAdmin(){
    $("#navBarAdmin").show();
    $("#navBarHome").hide();
}

function loginCliente(nomeCliente) {
    $("#navBarCliente").show();
    $("#navBarHome").hide();
}


$(document).ready(function() {
	var toggable = $("[data-toggable]");
	$("[data-toggle]").each(function(){
		var tab = $($( this ).attr('href'));
		$( this ).click(function(){
		  toggable.hide();
		  tab.show();
		});
	});

	toggable.hide();
	$("#home").show();
	
	var toggable2 = $("[data-toggable2]");
	$("[data-toggle2]").each(function(){
		var tab = $($( this ).attr('href'));
		$( this ).click(function(){
		  toggable2.hide();
		  tab.show();
		});
	});

	toggable2.hide();
  
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
				allDay: false // will make the time show
			},
			{
				title: 'Banho Pet - Pet: Godofredo',
                url: 'http://petshopbigdogsbrasil.com.br/site/uploads/banho-e-tosa/banho-medicamentoso/banho-cachorro-petitobi.jpg',
			   start: '2017-04-10T12:00:00',
			   end: '2017-04-10T13:00:00',
			   allDay: false // will make the time show
		   },
           {
				title: 'Vacina Pet - Pet: Pipoca',
                url: 'https://www.veterinariamatogrosso.com.br/uploads/images/2016/12/6-1480591557.jpg',
				start: '2017-04-17T08:00:00',
				end: '2017-04-17T09:00:00',
				allDay: false // will make the time show
			},
			{
				title: 'Banho Pet - Pet: Godofredo',
                url: 'http://petshopbigdogsbrasil.com.br/site/uploads/banho-e-tosa/banho-medicamentoso/banho-cachorro-petitobi.jpg',
			   start: '2017-04-19T12:00:00',
			   end: '2017-04-19T13:00:00',
			   allDay: false // will make the time show
		   },
           {
				title: 'Vacina Pet - Pet: Pipoca',
                url: 'https://www.veterinariamatogrosso.com.br/uploads/images/2016/12/6-1480591557.jpg',
				start: '2017-04-24T08:00:00',
				end: '2017-04-24T09:00:00',
				allDay: false // will make the time show
			},
			{
				title: 'Banho Pet - Pet: Godofredo',
                url: 'http://petshopbigdogsbrasil.com.br/site/uploads/banho-e-tosa/banho-medicamentoso/banho-cachorro-petitobi.jpg',
			   start: '2017-04-26T12:00:00',
			   end: '2017-04-26T13:00:00',
			   allDay: false // will make the time show
		   },
           {
				title: 'Vacina Pet - Pet: Pipoca',
                url: 'https://www.veterinariamatogrosso.com.br/uploads/images/2016/12/6-1480591557.jpg',
				start: '2017-05-01T08:00:00',
				end: '2017-05-01T09:00:00',
				allDay: false // will make the time show
			},
			{
				title: 'Banho Pet - Pet: Godofredo',
                url: 'http://petshopbigdogsbrasil.com.br/site/uploads/banho-e-tosa/banho-medicamentoso/banho-cachorro-petitobi.jpg',
			   start: '2017-05-04T12:00:00',
			   end: '2017-05-04T13:00:00',
			   allDay: false // will make the time show
		   },
           {
				title: 'Vacina Pet - Pet: Pipoca',
                url: 'https://www.veterinariamatogrosso.com.br/uploads/images/2016/12/6-1480591557.jpg',
				start: '2017-05-09T08:00:00',
				end: '2017-05-09T09:00:00',
				allDay: false // will make the time show
			},
			{
				title: 'Banho Pet - Pet: Godofredo',
                url: 'http://petshopbigdogsbrasil.com.br/site/uploads/banho-e-tosa/banho-medicamentoso/banho-cachorro-petitobi.jpg',
			   start: '2017-05-12T12:00:00',
			   end: '2017-05-12T13:00:00',
			   allDay: false // will make the time show
		   }
		],
		dayClick: function(date, jsEvent, view) {
			alert('Clicked on: ' + date.format('DD/MM/YYYY HH:mm'));
			
			// Get the modal
			var modal = document.getElementById('myModal');
		   // modal.getElementB('p').innerHTML = date.format('DD/MM/YYYY HH:mm');​
			modal.style.display = "block";

			// Get the <span> element that closes the modal
			var span = document.getElementsByClassName("close")[0];
			span.onclick = function() {
				modal.style.display = "none";
			}

		}
	})
});

