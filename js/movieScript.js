const searchBox = document.getElementById('search-box');
const searchList = document.getElementById('search-list');
const result = document.getElementById('result');
const addToFavourites = document.querySelector('#add-to-fav');
console.log('here');

// Function to find movies
function findMovies() {
    console.log('find movies')
    let title = (searchBox.value).trim();
    if (title.length > 0) {
        searchList.classList.remove('hide-search-list');
        loadMovies(title);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

// Function to get movies from OMDB API
async function loadMovies(title) {
    console.log('load movies')
    const URL = ` http://www.omdbapi.com/?i=tt3896198&apikey=9c148ccf&s=${title}&page=1`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    if (data.Response == "True") displayMovieList(data.Search);

}

// Function to display movie in search list
function displayMovieList(movies) {
    console.log('display movies list')

    searchList.innerHTML = "";
    for (let i = 0; i < movies.length; i++) {
        let listItem = document.createElement('div');
        listItem.dataset.id = movies[i].imdbID; // setting movie id in  data-id
        listItem.classList.add('search-list-item');
        if (movies[i].Poster != "N/A")
            moviePoster = movies[i].Poster;
        else
            moviePoster = "assets/image_not_found.png";

        listItem.innerHTML = `
        <div class = "thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[i].Title}</h3>
            <p>${movies[i].Year}</p>
        </div>
        `;

        searchList.appendChild(listItem);
    }
    console.log('here');
    loadMovieDetails();
}

// Function to get movie details from OMDB API
function loadMovieDetails() {

    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            searchList.classList.add('hide-search-list');
            searchBox.value = "";
            console.log(movie.dataset.id)
            const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=9c148ccf`);
            const movieDetails = await result.json();
            displayMovieDetails(movieDetails);
        });
    });
}

// Function to display movie info
function displayMovieDetails(details) {
    console.log('display movies details')

    result.innerHTML = `
    <div class = "poster">
        <img class="movie-poster" src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year"><b>Year:</b> ${details.Year}</li>
            <li class = "rating"><b>Ratings: ${details.Rated}</b></li>
            <li class = "released"><b>Released:</b> ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "director"><b>Director:</b> ${details.Director}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i style="color: gold;" class="fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;
    result.dataset.imdbID = details.imdbID;
    result.dataset.Year = details.Year;

    renderButtons();

}

const favMovieInLocal = [];




// console.log(folder);


// addToFavourites.addEventListener('click',);



async function getDataFromButton(event) {
    console.log(event);
    const folderId = event.target.id;
    console.log('Added');
    let i = 0;
    const favMovieTitle = document.querySelector('.movie-title').innerText;
    const favMovieId = result.dataset.imdbID;
    const favMovieYear = result.dataset.Year;
    console.log(favMovieId);
    const favMoviePoster = document.querySelector('.movie-poster').src;
    const favMovie = {
        Title: favMovieTitle,
        Poster: favMoviePoster,
        imdbID: favMovieId,
        Year: favMovieYear,
    }
    await axios.post('http://localhost:3000/movie', { favMovie, folderId: folderId});
    console.log(favMovie);
}

// Function to handle the click event
function handleButtonClick(event) {
    const clickedButtonId = event.target.id;
    console.log('Clicked Button ID:', clickedButtonId);
    // You can now use the clickedButtonId as needed
}

// Function to render the buttons
async function renderButtons() {
    console.log("reached render button")
    const buttonContainer = document.getElementById('buttonContainer');
    const folder = await axios.get('http://localhost:3000/playlistFolder');
    // Loop through the buttonIds array and create a button for each ID
    folder.data.data.forEach((val) => {
        const button = document.createElement('button');
        button.textContent = val.name;
        button.id = val._id;
        button.addEventListener('click', getDataFromButton);
        buttonContainer.appendChild(button);
    });
}

// event listener which gets activated on clicking search box
window.addEventListener('click', (event) => {
    console.log('here window')

    if (event.target.className != "searchBox") {
        searchList.classList.add('hide-search-list');
    }
});