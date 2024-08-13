const userName = document.querySelector("#name");
const phone = document.querySelector("#phone");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const signup__btn = document.querySelector(".signup__btn");
const emailLogin = document.querySelector("#emailLogin");
const passwordLogin = document.querySelector("#passwordLogin");
const signin__btn = document.querySelector(".signin__btn");
const signupForm = document.querySelector(".sign__up-form");
const requiredPar = document.createElement("p");
const storagedUser = localStorage.getItem("users");
const formSignUp = document.querySelector('.sign__up-form')
const formSignIn = document.querySelector('.sign__in-form')
const errorName = document.querySelector('.errorName')


const users = storagedUser ? JSON.parse(storagedUser) : [];




function validatePhoneNumber(phoneNumber) {
  const pattern = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}$/;
  const phoneArr = phoneNumber.split('')
  const res=pattern.test(phoneNumber)
  if(phoneArr[0] == "+" && res == true){
    return true
  }else{
    return false;
  }
 
}

function correctEmail(email){
  const emailArr = email.split('')
  return emailArr.includes('@')

}

signup__btn.addEventListener("click", () => {
  
  if (
    userName.value === "" ||
    phone.value === "" ||
    email.value === "" ||
    password.value === ""
  ) {
    requiredPar.innerText = "Все поля обязательны";
    requiredPar.style.color = "#F13C20";
  } 
  
 else if(!validatePhoneNumber(phone.value)){
    requiredPar.innerText = "Неверный формат телефона ";
    requiredPar.style.color = "#F13C20";
  }
  
  else if(phone.value.length < 8 || phone.value.length > 12){
    requiredPar.innerHTML = "Телефон должен местить  <br /> масимум 12 чисел <br /> минимум 8 чисел ";
    requiredPar.style.color = "#F13C20";
    }
  else if(userName.value.length < 2 || userName.value.length > 24){
      requiredPar.innerHTML = "Имя должно местить <br /> Минимум 2 символа <br /> максимум 24 символа";
      requiredPar.style.color = "#F13C20";
     }
 else if(email.value.length < 7){
      requiredPar.innerText = "Email минимум 7 символов ";
      requiredPar.style.color = "#F13C20";
     }
  else if(!correctEmail(email.value)){
    requiredPar.innerText = "Неверный формат email";
    requiredPar.style.color = "#F13C20";

  }
else if(password.value.length < 5 || password.value.length > 26){
  requiredPar.innerHTML = "Пароль должен местить <br /> Минимум 5 символов <br /> максимум 26 символов";
  requiredPar.style.color = "#F13C20";
}


 
  else {
    let isError = false;

    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email.value) {
        isError = true;
      }
    }
    if (isError) {
      requiredPar.innerText = "Пользователь с такой почтой уже существует!";
      requiredPar.style.color = "#F13C20";
    }

    else {
      const userData = {
        name: userName.value,
        phoneNumber: phone.value,
        email: email.value,
        password: password.value,
      };
      users.push(userData);
      localStorage.setItem("users", JSON.stringify(users));
      userName.value = "";
      phone.value = "";
      email.value = "";
      password.value = "";

      requiredPar.innerText = "Вы успешно зарегистрировались";
      requiredPar.style.color = "#439F76";
    }
  }
  signupForm.appendChild(requiredPar);

});

signin__btn.addEventListener('click' , ()=>{
  let isLoginError = true;
  for(let i=0; i < users.length; i++){
    if(emailLogin.value === users[i].email && passwordLogin.value === users[i].password){
      isLoginError = false
    }
  }
  if(isLoginError){
    if(emailLogin.value === "" || passwordLogin.value === ""){
      requiredPar.innerText = "Заполните пустые поля"
      requiredPar.style.color = "#F13C20"

    
    }
    else if(!correctEmail(emailLogin.value)){
      requiredPar.innerText = "Неверный формат email";
      requiredPar.style.color = "#F13C20";
  
    }
    else{
      requiredPar.innerText = "Введите коректные данние"
      requiredPar.style.color = "#F13C20"

    }

  }else{
    emailLogin.value = "" 
    passwordLogin.value = ""
    requiredPar.innerText = "Вы успешно вошли"
    requiredPar.style.color = "#439F76"

  }
  formSignIn.appendChild(requiredPar)
})