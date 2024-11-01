// $(document).ready(function() {
//     $('.faq-item').click(function() {
//         $(this).toggleClass('open');
//     });
// });


// const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': '00a2fa21f1msh78be1c180a27124p164793jsn8c96faba6e6e',
// 		'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
// 	}
// };

// async function fetchTopMovies() {
//     try {
//         const response = await fetch(url, options);
//         const result = await response.text(); // Fetch the raw text response
        
//         // Split by endlines or commas if necessary and log each on a new line
//         const lines = result.split('\n'); // Assuming each entry is on a new line
//         lines.forEach(line => {
//             console.log(line); // Log each line individually
//         });
//     } catch (error) {
//         console.error('Error fetching movies:', error);
//     }
// }

// // Call the function to execute
// fetchTopMovies();


//burger manu functional
const burgerManu = document.getElementById("burger-manu")
const burgerContent = document.getElementById("burgerContent")
const xButton = document.getElementById("x-button")
burgerManu.addEventListener('click',()=> {
    burgerContent.style.display='flex'
})

xButton.addEventListener("click", ()=> {
      burgerContent.style.display='none'
})


////////////////////////////////////////////////
//working on the quiz
const quizDiv = document.getElementById("quizDiv");
const quizStartButton = document.getElementById("quizStartButton");
const exitBtn = document.getElementById('exitBtn');
const nextBtn = document.getElementById("nextBtn");
const questions = document.getElementsByClassName("question");

let movies = [];
let currentQuestionIndex = 0; // Initialize currentQuestionIndex

async function fetchMovies() {
    const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '672449c84amsh219f8745f6d375cp1562acjsn16ae70421009',
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
        
        console.log("Movies fetched:", movies); // Log the fetched movies
        
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

function pickedTheAnswer(index) {
    const feelingArray = ['Good', 'Great', 'Sad', 'Okay'];
    const genreArray = ['Adventure', 'Comedy', 'Biography', 'Drama', 'Music'];
    const yearArray = ['Classic', 'Recent'];

    let finalArray = [];

    if (index === 0) {
        finalArray = feelingArray;
    } else if (index === 1) {
        finalArray = genreArray;
    } else if (index === 2) {
        finalArray = yearArray;
    }

    for (let item of finalArray) {
        const answer = document.getElementById(item);
        if (answer && answer.checked) {
            return answer; // Return the checked answer
        }
    }
}

// Function to show questions based on index
function showQuestions(index) {
    for (let i = 0; i < questions.length; i++) {
        questions[i].style.display = (i === index) ? 'block' : 'none'; //ternayr
    }
}

// Next button logic
nextBtn.addEventListener('click', () => {
    const pickedAnswer = pickedTheAnswer(currentQuestionIndex);
    
    // Check if an answer is selected
    if (!pickedAnswer) {
        return ; // Exit if no answer is selected, without showing an alert
    }

    currentQuestionIndex++; // Move to the next question

    if (currentQuestionIndex < questions.length) {
        showQuestions(currentQuestionIndex);
    } else {
        const pickedGenre = pickedTheAnswer(1); // genre
        if (pickedGenre) {
            const genreLabel = pickedGenre.value;
            console.log(`Selected Genre: ${genreLabel}`); // Log the selected genre

            const filterMovies = movies.filter(movie => {
                console.log(`Checking movie: ${movie.title} for genre: ${genreLabel}`); // Log the check
                return movie.genre.includes(genreLabel);
            });

            console.log(`Filtered Movies: ${filterMovies.length}`); // Log the number of filtered movies

            if (filterMovies.length > 0) {
                const selectedMovie = filterMovies[0]; // Get the first movie
                quizDiv.innerHTML = ''; // Clear previous content

                // Create and append the paragraph element
                const resultText = document.createElement('h1');
                resultText.textContent = 'The Result:'; // Set the text for the paragraph
                quizDiv.appendChild(resultText);

                // Create and style the image element
                const img = document.createElement('img');
                img.src = selectedMovie.image || 'placeholder.jpg';
                img.alt = selectedMovie.title || 'Movie Poster';
                
                // Set the desired styles
                img.style.width = '300px';
                img.style.height = '400px';
                img.style.marginLeft = '50px';
                quizDiv.style.width = '400px' 
                quizDiv.style.height = '500' + 'px'
                // Append the image to the quizDiv
                quizDiv.appendChild(img);
                
                // Create and append the exit button
                // Create and append the exit button
                const exitResultButton = document.createElement('button');
                exitResultButton.textContent = 'Exit';
                exitResultButton.id = 'exitResultButton'; // Set an ID for the button
                exitResultButton.style.width = '60px';
                exitResultButton.style.height = '36px';
                exitResultButton.style.borderRadius = '3px';
                exitResultButton.style.backgroundColor = 'red';
                exitResultButton.style.color = '#fff'; // Set the text color correctly
 
                 quizDiv.appendChild(exitResultButton);

                // Add event listener to exit the result
                exitResultButton.addEventListener('click', () => {
                    quizDiv.style.display = 'none'; // Hide the quizDiv
                });
                
            } else {
                console.log('No movies found for the selected genre.');
            }
        }
    }
});

// Start the quiz
quizStartButton.addEventListener('click', () => {
    quizDiv.style.display = 'flex';
    currentQuestionIndex = 0; // Reset index
    showQuestions(currentQuestionIndex);
});

// Exit the quiz
exitBtn.addEventListener('click', () => {
    quizDiv.style.display = 'none';
});

// Fetch movies to be used in the quiz
fetchMovies();