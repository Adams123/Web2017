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
				title: 'Vacina Pet',
				start: '2017-04-12T08:00:00',
				end: '2017-04-12T09:00:00',
				allDay: false // will make the time show
			},
			{
				title: 'Banho Pet',
			   start: '2017-04-10T12:00:00',
			   end: '2017-04-10T13:00:00',
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

