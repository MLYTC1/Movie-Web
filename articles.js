//having the access to the html elements
const firstArticlePage = document.getElementById('firstArticlePage')
const secondArticlePage = document.getElementById("secondArticlePage")
const thirdArticlePage = document.getElementById('thirdArticlePage')


//news part
const news1 = document.getElementById('news1')
const news2 = document.getElementById('news2')
const news3 = document.getElementById('news3')

const news1Title = document.getElementById('news1Title')
const news2Title = document.getElementById('news2Title')
const news3Title = document.getElementById("news3Title")

//function to hide all the divs
function hidingAllDivs(){
    const allDivs = document.getElementsByClassName('child-left-content')
    for(let i = 0 ; i < allDivs.length ; i++){
        allDivs[i].style.display = 'none'
    }
}

//function to display particular(desired) divs
function displayCurrentDivs(currentDivsByClassName){ 
    const particularDivs = document.getElementsByClassName(currentDivsByClassName) // reaching the divs my their classname
    for(let i = 0 ; i < particularDivs.length ; i++){
        particularDivs[i].style.display = 'block'
    }
}

firstArticlePage.addEventListener('click', ()=> {
    hidingAllDivs()
    displayCurrentDivs('page1')
})

secondArticlePage.addEventListener("click", ()=> {
    hidingAllDivs()
    displayCurrentDivs('page2')
})

thirdArticlePage.addEventListener("click", ()=>{
    hidingAllDivs()
    displayCurrentDivs('page3')
})


news1.addEventListener('click' , () => {
    hidingAllDivs()
    displayCurrentDivs('additional1')
})

news2.addEventListener('click', ()=> {
    hidingAllDivs()
    displayCurrentDivs('additional2')
})

news3.addEventListener('click',()=> {
    hidingAllDivs()
    displayCurrentDivs('additional3')
})

news1Title.addEventListener('click', ()=>{
    hidingAllDivs()
    displayCurrentDivs('additional1')
})

news2Title.addEventListener("click", () => {
    hidingAllDivs()
    displayCurrentDivs('additional2')
})

news3Title.addEventListener("click" , () => {
    hidingAllDivs()
    displayCurrentDivs('additional3')
})

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