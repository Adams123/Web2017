var imagem;

function encodeImageFileAsURL(element) {
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function() {
    imagem=reader.result
  }
  reader.readAsDataURL(file);
}
