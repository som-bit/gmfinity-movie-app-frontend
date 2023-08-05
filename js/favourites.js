const wrapper = document.getElementById('wrapper');

//const favMovie = JSON.parse(localStorage.getItem('favMoviesArray'));

async function getUserPlaylist() {
    const folderId = '64ceaab5d21172de78feda7f'
    const getMovies = await axios.get(`http://localhost:3000/getUserPlaylist/${folderId}`);
    console.log(getMovies);
}


getUserPlaylist();




//get folder playlist

