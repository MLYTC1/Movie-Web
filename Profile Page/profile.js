// regirtration conteiner variables
const singUp = document.getElementById('singUp')
const singUpConteiner = document.getElementById('singUpConteiner')
const conteinerRegistration = document.getElementById('conteinerRegistration')
const cancel = document.getElementById('cancel')

// inputs variable 
//--------------------------------------------
const userName = document.getElementById('name')
const inputEmail = document.getElementById('inputEmail')
const pass = document.getElementById('pass')
const repPass = document.getElementById('repPass')
// --------------------------------------------


const btnReg = document.getElementById('btn_reg')  //register button variable
const error = document.getElementById('error') //form error paragraf variable

accArr = []

// hidden registration display
singUp.addEventListener('click', () => {
   singUpConteiner.style.display = 'flex'
   
})

//display registration hidden 
cancel.addEventListener('click', () =>{
    singUpConteiner.style.display = 'none'
})


// registration
function allInput(regname, regmail, regrepeatPass, regpass){
    this.regname = regname
    this.regmail = regmail
    this.regpass = regpass
    this.regrepeatPass = regrepeatPass
}

// user info created object
function regisration(){
    
    let regname = userName.value
    let regmail = inputEmail.value
    let regpass = pass.value
    let regRepeatPass = repPass.value

    const person = new allInput(regname, regmail, regRepeatPass, regpass)
    
// error warning
        if (userName.value == ''){
            error.innerHTML = 'Enter Your Name'
        }else if(inputEmail.value ==''){
            error.innerHTML = 'Enter Your Email'
        }else if(pass.value == ''){
            error.innerHTML = 'Enter Your Password'
        }else if(repPass.value == ''){
            error.innerHTML = 'Enter Your Repeat Password'
        }else if (repPass.value != pass.value){
            error.innerHTML = 'Error Repeat Password'
        }else {
        accArr.push(person) // add array object
        localStorage.setItem('users', JSON.stringify(accArr));
        error.innerHTML = ''
        }
        
        userName.value = ''
        inputEmail.value = ''
        pass.value = ''
        repPass.value = ''
        
    
}


btnReg.addEventListener('click', () => {
    regisration()
})


//--------------------------------
        // sing in form
// -------------------------------

const singIn = document.getElementById('singIn')
const singInConteiner = document.getElementById('singInConteiner')
const conteinerSingIn = document.getElementById('conteinerSingIn')
const singInCancel = document.getElementById('singInCancel')

// inputs variable 
//--------------------------------------------
const singInName = document.getElementById('singInName')
const singInPass = document.getElementById('singInPass')
const btnSingIn = document.getElementById('btn_sing-in')
const singError = document.getElementById('singError')
// --------------------------------------------



//-------------------
const ProfileName = document.getElementById("ProfileName")
const emailSpan = document.getElementById("emailSpan")
const userSpan = document.getElementById('userSpan')

//--------------------
let loggedInUser = null;

// hidden registration display
singIn .addEventListener('click', () => {
    singInConteiner.style.display = 'flex'
    
 })
 
 //display registration hidden 
 singInCancel.addEventListener('click', () =>{
    singInConteiner.style.display = 'none'
 })

 //LocalStorage checks the data and if it matches it enters the user
 
 let getStorage = (JSON.parse(localStorage.getItem('users'))); // ამ ცვლადით მივწვდებით localStorage_ში დამატებული ინფორმაციას

 btnSingIn.addEventListener('click', () => {
    getStorage.find((element,index,arr) =>{
        console.log(getStorage[element]);
    
    if (singInName.value === element.regname &&  singInPass.value === element.regpass){
        alert('done')
        ProfileName.innerHTML = singInName.value;
        emailSpan.innerHTML = element.regmail
        userSpan.innerHTML = singInName.value
        singError.innerHTML = ''
        }else{
            singError.innerHTML = 'The name or passwprd is incorrect'
        }
    })
    singInName.value = ''
    singInPass.value = ''
})