export default (url) => {

  let promise = new Promise((resolved,rejected) => {

    var xhr = new XMLHttpRequest();
    xhr.onload = async function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        resolved(reader.result)
      }

      reader.readAsDataURL(xhr.response);
    };

    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  })

  return promise


}
