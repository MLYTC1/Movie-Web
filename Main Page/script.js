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
//functional for the quiz
// let movies = [];

// async function fetchMovies() {
//     const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
//     const options = {
//         method: 'GET',
//         headers: {
// 		'x-rapidapi-key': '0255cc476amsh4a76ddd84018ce9p187cb1jsnbed9340b7ae8',
// 		'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
//         }
//     };

//     try {
//         const response = await fetch(url, options);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();
//         movies = result; 
        
//         console.log(movies); 
//         displayMovies(movies); 
        
//     } catch (error) {
//         console.error('Error fetching movies:', error);
//     }
// }




const quizDiv = document.getElementById("quizDiv")//Quiz Div
const quizStartButton = document.getElementById("quizStartButton") //Start
const exitBtn = document.getElementById('exitBtn')//Exit
const nextBtn = document.getElementById("nextBtn") //Next

const questions = document.getElementsByClassName("question")


let currentQuestionIndex = 0;
quizStartButton.addEventListener('click', ()=> {
    quizDiv.style.display = 'flex'
    showQuestions(currentQuestionIndex)
})

exitBtn.addEventListener('click',()=>{
    quizDiv.style.display = 'none'
})



//function which shows the questions by the index
function showQuestions(index){
    for(let i = 0 ; i < questions.length; i++){
        if(i == index){
            questions[i].style.display = 'block'
        }else{
            questions[i].style.display = 'none'
        }
    }
}


//function that ensures that user selected on of the answers
function pickedTheAnswer(index){
    //creating the arrays to put answers's ids(answers with the same id will be put in the same array)
    const feelingArray = ['Good' , 'Great' , 'Sad','Okay']
    const genreAraray = ['Comedy', 'Drama', 'Action', 'Crime', 'Romance', 'Thriller']
    const yearArray = ['Classic' , 'Recent']

    let finalArray = []

    if(index == 0){
        finalArray = feelingArray
    }else if(index == 1){
        finalArray = genreAraray
    }else if(index == 2){
        finalArray == yearArray
    }

    for(let item of finalArray){
        const answer = document.getElementById(item)
        if(answer == true){
            return answer
        }
    }

   
}

//next button
nextBtn.addEventListener('click', () => {
   
    const pickedAnswer = pickedTheAnswer(currentQuestionIndex) //saved the selected answer by its id
    if(pickedAnswer == false){ //if use did not pick the unswer
        alert('You Have To Choose One Of The Answers!')
    }else{
        currentQuestionIndex++;

        if(currentQuestionIndex < questions.length){
            showQuestions(currentQuestionIndex)//next question will be appeared
        }else{
            //the quiz is finished and the result is ready:
            const pickedGenre = pickedTheAnswer(1) // genre
            let genreLabel = pickedGenre.value

            const img = document.createElement('img')

            let filterMovies = movies.filter(function(movie){
                return movie.genre.includes(genreLabel)
            })

            const randomIndex = Math.floor(Math.random() * filterMovies.length);
            img.src = filterMovies[randomIndex].image;
            quizDiv.innerHTML = '';
            quizDiv.appendChild(img);
        }
    }

})