const wrapper = document.getElementById('wrapper');



async function getUserPlaylist() {
    const folderId = '64ceaab5d21172de78feda7f'
    const getMovies = await axios.get(`http://localhost:3000/getUserPlaylist/${folderId}`);
    const list = getMovies.data;
    console.log(list);

    const lockedMoviesContainer = document.getElementById('lockedMovies');
    // const unlockedMoviesContainer = document.getElementById('unlockedMovies');

    const lockedMovies = list.filter(item => item.playlistFolder.isLock);
    // const unlockedMovies = list.filter(item => !item.playlistFolder.isLock);
    // console.log(unlockedMovies);

    lockedMoviesContainer.innerHTML = generateMovieListHTML(lockedMovies);
    // unlockedMoviesContainer.innerHTML = generateMovieListHTML(unlockedMovies);
}


function generateMovieListHTML(movieList) {
    return movieList.map(movie => {
        return `
      <div class="movie">
        <img src="${movie.movie.Poster}" alt="${movie.movie.Title}" />
        <h2>${movie.movie.Title}</h2>
        <p>Year: ${new Date(movie.movie.Year).getFullYear()}</p>
      </div>
    `;
    }).join('');
}

getUserPlaylist();