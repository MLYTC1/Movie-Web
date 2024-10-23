// $(document).ready(function() {
//     $('.faq-item').click(function() {
//         $(this).toggleClass('open');
//     });
// });


const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '00a2fa21f1msh78be1c180a27124p164793jsn8c96faba6e6e',
		'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
	}
};

async function fetchTopMovies() {
    try {
        const response = await fetch(url, options);
        const result = await response.text(); // Fetch the raw text response
        
        // Split by endlines or commas if necessary and log each on a new line
        const lines = result.split('\n'); // Assuming each entry is on a new line
        lines.forEach(line => {
            console.log(line); // Log each line individually
        });
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// Call the function to execute
fetchTopMovies();
