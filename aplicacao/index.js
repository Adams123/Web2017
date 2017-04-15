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
            $('.calendar').fullCalendar({
                weekends: false,
                defaultView: 'agendaWeek',
                businessHours: {
                    dow: [1, 2, 3, 4, 5], // Monday - Friday
                    start: '08:00',
                    end: '18:00',
                },
                allDaySlot: false,
                slotDuration: '01:00:00',
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
                    //events.push({title  : 'Banho Pet',
                    //    start  : '2017-04-13T12:00:00',
                    //   end    : '2017-04-13T13:00:00'});
                    //alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                    //alert('Current view: ' + view.name);
                    // change the day's background color just for fun
                    //$(this).css('background-color', 'red');
                }
            })
        });
