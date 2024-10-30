
//     async function fetchMovies() {
//         const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
//         const options = {
//             method: 'GET',
//             headers: {
//             'x-rapidapi-key': '21384ae483msh01e2c4a39568d3bp1ea7cajsn86f6609c4249',
//             'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
//             }
//         };

//         try {
//             const response = await fetch(url, options);
//             const result = await response.json(); 
//             displayMovies(result); 
//         } catch (error) {
//             console.error(error);
//         }
//     }

    // function displayMovies(movies) {
    //     const motherMoviesDiv = document.getElementById('mother-movies');
    //     motherMoviesDiv.innerHTML = ''; 

    //     movies.forEach(movie => {
    //         // Create movie element
    //         const childDiv = document.createElement('div');
    //         childDiv.className = 'child-movies';

    //         const img = document.createElement('img');
    //         img.src = movie.image; 
    //         img.alt = movie.title;

    //         const title = document.createElement('p');
    //         title.className = 'movie-title';
    //         title.textContent = movie.title;
    //         const additionalInfo = document.createElement('p');
    //         additionalInfo.className = 'additional-info';
    //         additionalInfo.textContent = `${movie.year} ‧ ${movie.genre} ‧ ${movie.duration}`;

    //         childDiv.appendChild(img);
    //         childDiv.appendChild(title);
    //         childDiv.appendChild(additionalInfo);

    //         childDiv.addEventListener('click', () => {
    //             showMovieInfo(movie); 
    //         });

    //         motherMoviesDiv.appendChild(childDiv);
    //     });
    // }



//     fetchMovies();


let movies = []; 

async function fetchMovies() {
    const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
    const options = {
        method: 'GET',
        headers: {
		'x-rapidapi-key': '0255cc476amsh4a76ddd84018ce9p187cb1jsnbed9340b7ae8',
		'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        movies = result; 
        
        console.log(movies); 
        displayMovies(movies); 
        
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}


function displayMovies(moviesToDisplay) {
    const motherMoviesDiv = document.getElementById('mother-movies');
    motherMoviesDiv.innerHTML = ''; 

    if (!moviesToDisplay || moviesToDisplay.length === 0) {
        motherMoviesDiv.innerHTML = '<p>No movies found.</p>';
        return;
    }
    moviesToDisplay.forEach(movie => {
        const childDiv = document.createElement('div');
        childDiv.className = 'child-movies';

        const img = document.createElement('img');
        img.src = movie.image || 'placeholder.jpg'; 
        img.alt = movie.title || 'Movie Poster';

        const title = document.createElement('p');
        title.className = 'movie-title';
        title.textContent = movie.title || 'Unknown Title';

        const additionalInfo = document.createElement('p');
        additionalInfo.className = 'additional-info';
        additionalInfo.textContent = `${movie.year || 'N/A'} ‧ ${movie.genre || 'N/A'} ‧ ${movie.duration || 'N/A'}`;
        childDiv.addEventListener('click', () => {
            showMovieInfo(movie); 
        });
        childDiv.appendChild(img);
        childDiv.appendChild(title);
        childDiv.appendChild(additionalInfo);

        motherMoviesDiv.appendChild(childDiv);
    });
}
function showMovieInfo(movie) {
    document.getElementById('infoTitle').textContent = movie.title;
    document.getElementById('infoImage').src = movie.image;
document.getElementById('infoDetails1').textContent = 
`Year: ${movie.year}`;

document.getElementById('infoDetails2').textContent = `Genre: ${movie.genre}`;

document.getElementById('infoDetails3').textContent = `Rank: ${movie.rank}`;
    const movieInfoDiv = document.getElementById('movieInfo');
    movieInfoDiv.classList.add('show');
}

document.getElementById('closeInfo').addEventListener('click', () => {
    const movieInfoDiv = document.getElementById('movieInfo');
    movieInfoDiv.classList.remove('show'); 
});

function filterAndSearchMovies() {
    const selectedGenre = document.getElementById('Genre').value;
    const selectedYear = document.getElementById('Year').value;
    const selectedIMDB = document.getElementById('IMDB').value;
    const selectedCountry = document.getElementById('Country').value;
    const searchInput = document.getElementsByClassName('search-input')[0].value.toLowerCase();

    const filteredMovies = movies.filter(movie => {
        const matchesGenre = selectedGenre === 'genres' || (movie.genre && movie.genre.includes(selectedGenre));
        const matchesYear = selectedYear === 'Year' || (movie.year && movie.year.toString() === selectedYear);
        const matchesIMDB = selectedIMDB === 'IMDB' || (movie.imdbRating && movie.imdbRating >= parseFloat(selectedIMDB));
        const matchesCountry = selectedCountry === 'Country' || (movie.country && movie.country.includes(selectedCountry));
        const matchesSearch = movie.title.toLowerCase().includes(searchInput);

        return matchesGenre && matchesYear && matchesIMDB && matchesCountry && matchesSearch;
    });

    displayMovies(filteredMovies);
}

document.getElementsByClassName('search-input')[0].addEventListener('keyup', filterAndSearchMovies);
document.getElementById('searchButton').addEventListener('click', filterAndSearchMovies);
document.getElementById('Genre').addEventListener('change', filterAndSearchMovies);
document.getElementById('Year').addEventListener('change', filterAndSearchMovies);
document.getElementById('IMDB').addEventListener('change', filterAndSearchMovies);
document.getElementById('Country').addEventListener('change', filterAndSearchMovies);

fetchMovies();