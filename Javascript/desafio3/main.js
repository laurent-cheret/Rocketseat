/*function checaIdade(idade) {
  // Retornar uma promise
  return new Promise(function (resolve, reject) {
    if (idade >= 18) {
      setTimeout(resolve, 2000);
    } else {
      setTimeout(reject, 2000);
    }
  });
}
checaIdade(20)
  .then(function () {
    console.log("Maior que 18");
  })
  .catch(function () {
    console.log("Menor que 18");
  });
*/

var inputElement = document.querySelector("input");
var buttonElement = document.querySelector("button");
var listElement = document.querySelector("#lista ul");

function procurarApi() {
  listElement.innerHTML = "";
  var usuario = inputElement.value;
  var loadingElement = document.createElement("li");
  var loadingText = document.createTextNode("Carregando...");
  loadingElement.appendChild(loadingText);
  listElement.appendChild(loadingElement);
  axios
    .get("https://api.github.com/users/" + usuario + "/repos")
    .then(function (response) {
      var repos = response.data;

      console.log(response.request.readyState);
      for (repo of repos) {
        var repoElement = document.createElement("li");
        var textElement = document.createTextNode(repo.name);
        repoElement.appendChild(textElement);
        listElement.appendChild(repoElement);
        //console.log(repo.name);
        if (response.request.readyState === 4 && response.status === 200) {
          loadingElement.remove();
        }
      }
      //loadingElement.remove();
      console.log(response.status);
    })
    .catch(function (error) {
      alert("Erro 404: Repositórios não encontrados");
      loadingElement.remove();
    });
}
