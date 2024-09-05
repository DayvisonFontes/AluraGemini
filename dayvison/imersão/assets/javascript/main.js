function pesquisar() {
    // Seleciona a seção HTML onde os resultados serão exibidos
    let section = document.getElementById('resultados-pesquisa');

    // Inicializa uma string vazia para armazenar o HTML dos resultados
    let resultados = "";

    // Itera sobre cada item do array de dados
    for (let dado of dados) {
      // Cria uma nova div para cada resultado
    resultados += `
        <div class="item-resultado">
        <h2><a href="${dado.link}" target="_blank" rel="external">${dado.titulo}</a></h2>
        <p class="descricao-meta">${dado.descricao}</p>
        </div>`;
    }

    // Atualiza o conteúdo da seção com os resultados gerados
    section.innerHTML = resultados;
}