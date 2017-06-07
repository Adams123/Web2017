// Membros do Grupo:
// * Adams Vietro Codignotto da Silva - 6791943
// * Antonio Pedro Lavezzo Mazzarolo - 8626232
// * Gustavo Dutra Santana - 8532040
// * Veronica Vannini - 8517369

var imagem;
//passa uma imagem adicionada no fileUpload(qualquer um) para a variavel global imagem. isso acontece toda vez que alguém faz upload de imagem, então a variável pode ser acessada de qualquer lugar. vai dar pau se upar uma imagem ao cliente, trocar a guia, upar outra imagem e depois enviar a primeira pro bd
function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        imagem = reader.result
    }
    reader.readAsDataURL(file);
}
