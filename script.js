const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');
const original = document.getElementById('artist-card');


let artistNumber = 0;

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}&_sort=name&_order=asc`;
    fetch(url)
        .then((Response) => Response.json())
        .then(result => {
            artistNumber = result.length;
            console.log(artistNumber);
            displayResults(result);
        });
}

function displayResults(result) {
    let current = 1;
    resultPlaylist.classList.add('hidden');
    // const artistName = document.getElementById('artist-name');
    // const artistImage = document.getElementById('artist-img');

    result.forEach((element) => {
        cloneComponent(current);
        const currentArtist = document.getElementById(`artist-card${current}`);
        const artistName = currentArtist.querySelector('.artist-name');
        const artistImage = currentArtist.querySelector('.artist-img');
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
        current ++;
    });

    resultArtist.classList.remove('hidden');
}

function cloneComponent(id){
    const clone = original.cloneNode(true);
    const gridContainer = document.getElementById('grid-container');
    clone.id = `artist-card${id}`;

    gridContainer.appendChild(clone);
}



document.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        return;
    }

    requestApi(searchTerm);

});
