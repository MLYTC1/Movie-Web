
    async function fetchMovies() {
        const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
        const options = {
            method: 'GET',
            headers: {
            'x-rapidapi-key': 'ff1e71200bmsh0f1244309f8b532p143d91jsnafc5c3da31c6',
            'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json(); 
            displayMovies(result); 
        } catch (error) {
            console.error(error);
        }
    }

    function displayMovies(movies) {
        const motherMoviesDiv = document.getElementById('mother-movies');
        motherMoviesDiv.innerHTML = ''; 

        movies.forEach(movie => {
            // Create movie element
            const childDiv = document.createElement('div');
            childDiv.className = 'child-movies';

            const img = document.createElement('img');
            img.src = movie.image; 
            img.alt = movie.title;

            const title = document.createElement('p');
            title.className = 'movie-title';
            title.textContent = movie.title;
            const additionalInfo = document.createElement('p');
            additionalInfo.className = 'additional-info';
            additionalInfo.textContent = `${movie.year} ‧ ${movie.genre} ‧ ${movie.duration}`;

            childDiv.appendChild(img);
            childDiv.appendChild(title);
            childDiv.appendChild(additionalInfo);

            childDiv.addEventListener('click', () => {
                showMovieInfo(movie); 
            });

            motherMoviesDiv.appendChild(childDiv);
        });
    }

    function showMovieInfo(movie) {
        document.getElementById('infoTitle').textContent = movie.title;
        document.getElementById('infoImage').src = movie.image;
        document.getElementById('infoDetails').textContent = `Year: ${movie.year}, Genre: ${movie.genre}, Duration: ${movie.duration}`;

        const movieInfoDiv = document.getElementById('movieInfo');
        movieInfoDiv.classList.add('show');
    }

    document.getElementById('closeInfo').addEventListener('click', () => {
        const movieInfoDiv = document.getElementById('movieInfo');
        movieInfoDiv.classList.remove('show'); 
    });

    fetchMovies();