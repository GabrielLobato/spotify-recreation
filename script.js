
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');
const gridContainer = document.getElementById('grid-container');


function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}&_sort=name&_order=asc`;
    fetch(url)
        .then((Response) => Response.json())
        .then(result => {
            displayResults(result);
        });
}

function displayResults(result) {
    let current = 1;
    resultPlaylist.classList.add('hidden');

    while (gridContainer.firstChild) { gridContainer.removeChild(gridContainer.firstChild) }

    result.forEach((element) => {
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

function cloneComponent(id) {
    const original = document.getElementById('artist-card');
    const clone = original.cloneNode(true);
    clone.id = `artist-card${id}`;

    gridContainer.appendChild(clone);
}



document.addEventListener('input', function () {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        return;
    }

    requestApi(searchTerm);

});
