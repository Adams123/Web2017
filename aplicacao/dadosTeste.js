//animais e servicos tem id incremental


const adminData = [
    {
        name: "admin",
        pass: "admin",
        cpf: "10000000000",
        foto: null,
        telefone: "12312313",
        email: "teste@gmail.com"
    }
];

const clienteTeste = [{
  "nome": "Forbes Carles",
  "endereco": "6 Corben Alley",
  "pass": "pass",
  "cpf": "323-35-1466",
  "foto": null,
  "telefone": "7-(322)438-4706",
  "email": "fcarles0@pbs.org"
}, {
  "nome": "Wendy Genney",
  "endereco": "55 Marcy Street",
  "pass": "pass",
  "cpf": "671-00-6165",
  "foto": null,
  "telefone": "33-(748)342-2816",
  "email": "wgenney1@ow.ly"
}, {
  "nome": "Valentijn Yushankin",
  "endereco": "970 Calypso Place",
  "pass": "pass",
  "cpf": "977-71-4217",
  "foto": null,
  "telefone": "234-(384)908-8270",
  "email": "vyushankin2@geocities.jp"
}, {
  "nome": "Crin Rumens",
  "endereco": "439 Marquette Plaza",
  "pass": "pass",
  "cpf": "182-03-0311",
  "foto": null,
  "telefone": "55-(759)860-5528",
  "email": "crumens3@comcast.net"
}, {
  "nome": "Viviene Beincken",
  "endereco": "0 Sommers Road",
  "pass": "pass",
  "cpf": "448-34-4544",
  "foto": null,
  "telefone": "86-(420)792-6333",
  "email": "vbeincken4@cisco.com"
}];


const produtosTeste = [{
  "nome": "SHISEIDO ULTIMATE SUN PROTECTION PLUS",
  "barCode": 32037,
  "foto": null,
  "descricao": "Morbi porttitor lorem id ligula.",
  "preco": 32.81,
  "qntEstoque": 26,
  "qntVend": 52
}, {
  "nome": "LEADER Chest Congestion Relief",
  "barCode": 32199,
  "foto": null,
  "descricao": "Nunc rhoncus dui vel sem. Sed sagittis.",
  "preco": 63.41,
  "qntEstoque": 76,
  "qntVend": 87
}, {
  "nome": "fast mucus relief",
  "barCode": 4960,
  "foto": null,
  "descricao": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.",
  "preco": 56.02,
  "qntEstoque": 3,
  "qntVend": 95
}, {
  "nome": "Aspergillus repens",
  "barCode": 23952,
  "foto": null,
  "descricao": "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.",
  "preco": 11.55,
  "qntEstoque": 53,
  "qntVend": 95
}, {
  "nome": "finipil Lait 50",
  "barCode": 11191,
  "foto": null,
  "descricao": "Duis consequat dui nec nisi volutpat eleifend.",
  "preco": 6.37,
  "qntEstoque": 86,
  "qntVend": 85
}];

const servicosTeste = [{
  "nome": "Lake Erie Medical DBA Quality Care Products LLC",
  "foto": null,
  "descricao": "Nulla nisl.",
  "preco": 77.99
}, {
  "nome": "Wal-Mart Stores, Inc",
  "foto": null,
  "descricao": "In congue.",
  "preco": 207.83
}, {
  "nome": "Bryant Ranch Prepack",
  "foto": null,
  "descricao": "Nulla tellus.",
  "preco": 65.4
}, {
  "nome": "Merck Sharp & Dohme Corp.",
  "foto": null,
  "descricao": "Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.",
  "preco": 319.11
}, {
  "nome": "White Manufacturing Inc. DBA Micro-West",
  "foto": null,
  "descricao": "Etiam justo.",
  "preco": 161.45
}]

const animaisTeste = [{
  "nome": "Burtie",
  "raca": "Caniche",
  "idade": 5,
  "foto": null
}, {
  "nome": "Moritz",
  "raca": "Scottish Terrier",
  "idade": 14,
  "foto": null
}, {
  "nome": "Caryl",
  "raca": "Smooth Collie",
  "idade": 2,
  "foto": null
}, {
  "nome": "Benedikt",
  "raca": "Husky Siberiano",
  "idade": 8,
  "foto": null
}, {
  "nome": "Aluin",
  "raca": "Bull Terrier",
  "idade": 7,
  "foto": null
}];

var eventos = [{
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
		];
