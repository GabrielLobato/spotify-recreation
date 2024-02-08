
// Pegando referências dos IDs para manipular no Javascript
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');
const gridContainer = document.getElementById('grid-container');

// Request da API que armazena dados dos artistas 
function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}&_sort=name&_order=asc`;
    fetch(url)
        .then((Response) => Response.json())
        .then(result => {
            displayResults(result);
        });
}

// Função responsável por pegar os resultados da requestApi() e exibir no HTML
function displayResults(result) {
    // variável para criar os IDs das divs clonadas
    let current = 1;  
    resultPlaylist.classList.add('hidden');

    // limpa primeiro todos os componentes filhos/resultados antigos da div 'grid-container' para assim depois exibir os resultados novos 
    while (gridContainer.firstChild) { gridContainer.removeChild(gridContainer.firstChild) }


    result.forEach((element) => {
        // chama a função cloneComponent para trabalhar encima do elemento copiado, criando assim um elemento novo para cada artista existente no resultado da pesquisa
        cloneComponent(current);
        const currentArtist = document.getElementById(`artist-card${current}`);
        const artistName = currentArtist.querySelector('.artist-name');
        const artistImage = currentArtist.querySelector('.artist-img');
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
        current++;
    });

    resultArtist.classList.remove('hidden');
}

// função responsável por clonar um componente específico 
function cloneComponent(id) {
    // pegando o ID do componente que vai ser clonado
    const original = document.getElementById('artist-card');
    // Clonando o componente e armazenando na variável clone
    const clone = original.cloneNode(true);
    // O componente clonado vai receber um novo ID artist-card1, 2, 3, etc de acordo com o valor que estiver na variável 'current'
    clone.id = `artist-card${id}`;
    // o componente já clonado e com uma ID nova vai ser inserido dentro da div já estilizada 'grid-container'
    gridContainer.appendChild(clone);
}


// sempre que digitado algo na barra de pesquisa será acionado esse bloco
document.addEventListener('input', function () {
    const searchInput = document.getElementById('search-input');
    // formata os dados digitadoos na barra de pesquisa para caixa baixa
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        return;
    }

    // aciona a função requestApi fornecendo as informações de o que foi digitado na barra de pesquisa
    requestApi(searchTerm);

});

// CONFIGURAR MENSAGEM DE: BOM DIA|BOA TARDE|BOA NOITE
const greetingContent = document.getElementById('greeting');

// Obtém a hora atual do sistema
const currentHour = new Date().getHours();

// Define a mensagem de saudação de acordo com o horário 
const greetingMessage =
  currentHour >= 5 && currentHour < 12
    ? "Bom dia"
    : currentHour >= 12 && currentHour < 18
    ? "Boa tarde"
    : "Boa noite";

// Exibe a mensagem de saudação no HTML
greetingContent.textContent = greetingMessage;