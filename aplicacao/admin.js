var clientes = {[
  {
    "nome": "Duffy Harrington",
    "pass": 123,
    "address": "767 McKibbin Street, Rockbridge, District Of Columbia, 1471",
    "id": 0,
    "foto": "http://placehold.it/32x32",
    "phone": "+1 (936) 484-3788",
    "email": "duffyharrington@xanide.com"
  },
  {
    "nome": "Dale Ellison",
    "pass": 123,
    "address": "246 Macon Street, Maybell, Ohio, 5513",
    "id": 1,
    "foto": "http://placehold.it/32x32",
    "phone": "+1 (853) 460-3139",
    "email": "daleellison@xanide.com"
  },
  {
    "nome": "Tammie Davis",
    "pass": 123,
    "address": "883 Campus Place, Davenport, North Dakota, 5354",
    "id": 2,
    "foto": "http://placehold.it/32x32",
    "phone": "+1 (978) 455-3935",
    "email": "tammiedavis@xanide.com"
  },
  {
    "nome": "Daugherty Schultz",
    "pass": 123,
    "address": "747 Florence Avenue, Elfrida, American Samoa, 8623",
    "id": 3,
    "foto": "http://placehold.it/32x32",
    "phone": "+1 (809) 489-3740",
    "email": "daughertyschultz@xanide.com"
  },
  {
    "nome": "Imelda Cleveland",
    "pass": 123,
    "address": "292 Krier Place, Graball, Virginia, 1757",
    "id": 4,
    "foto": "http://placehold.it/32x32",
    "phone": "+1 (896) 551-2180",
    "email": "imeldacleveland@xanide.com"
  },
  {
    "nome": "Horne Steele",
    "pass": 123,
    "address": "900 Dekalb Avenue, Tuttle, Alaska, 8289",
    "id": 5,
    "foto": "http://placehold.it/32x32",
    "phone": "+1 (910) 598-2532",
    "email": "hornesteele@xanide.com"
  }
]};
var cliTam = clientes.length;

function buildHtmlTable(selector) {
  var columns = addAllColumnHeaders(myList, selector);

  for (var i = 0; i < myList.length; i++) {
    var row$ = $('<tr/>');
    for (var colIndex = 0; colIndex < columns.length; colIndex++) {
      var cellValue = myList[i][columns[colIndex]];
      if (cellValue == null) cellValue = "";
      row$.append($('<td/>').html(cellValue));
    }
    $(selector).append(row$);
  }
}

function addAllColumnHeaders(myList, selector) {
  var columnSet = [];
  var headerTr$ = $('<tr/>');

  for (var i = 0; i < myList.length; i++) {
    var rowHash = myList[i];
    for (var key in rowHash) {
      if ($.inArray(key, columnSet) == -1) {
        columnSet.push(key);
        headerTr$.append($('<th/>').html(key));
      }
    }
  }
  $(selector).append(headerTr$);

  return columnSet;
}
