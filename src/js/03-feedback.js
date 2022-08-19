import throttle from "lodash.throttle";
import storageApi from "./storage"


const FEEDBACK_FORM_KEY = "feedback-form-state";
const formFeedback = document.querySelector(".feedback-form");

initialPage();
formFeedback.addEventListener('input', throttle(handleInput, 500));
formFeedback.addEventListener("submit", handleSubmit);


// передает в хранилише данные из формы
function handleInput(event) {
  const { name, value } = event.target;   // получаем текущий елемент формы
  let savedData = storageApi.load(FEEDBACK_FORM_KEY);  // получает объект из хранилища по ключу FEEDBACK_FORM_KEY
  
  // при первом вызове savedData = undefined,т.к. метод load(key) загружает 
  // из хранилища localStorage значение value по ключу key, а (localStorage) получает 
  // информацию про ключ key только во время взова метода save(key, value), который устанавливает 
  // ключ key для хранилища и записывает в него значение value: localStorage.setItem(key, value)
  if (!savedData) {
      savedData = {}
  }
  savedData[name] = value;  // передаем в объект savedData данные формы
  storageApi.save(FEEDBACK_FORM_KEY, savedData);  // в этот момент в хранилище попадает объект savedData
}

// заполняет форму данными из хранилища
function initialPage() {
  const savedData = storageApi.load(FEEDBACK_FORM_KEY);   // получаем данные из хранилища
  if (savedData) {                                        // если хранилище не пустое
    Object.entries(savedData).forEach(([name, value]) => {    //переводим объект savedData в массив и для каждого
      formFeedback.elements[name].value = value;      // в элемент формы с именем name записываем значение value
    })
  }
}

// выводит в консоль данные формы, потом очищает форму и хранилище
function handleSubmit (event) { 
  event.preventDefault();   //отмена действия по умолчанию
  const { email, message } = event.currentTarget;   //получаем форму и дуструктуризируем ее
  console.log({email: email.value, message: message.value});  // выводим в консоль данные формы
  event.currentTarget.reset();    // очистка формы
  storageApi.remove(FEEDBACK_FORM_KEY);   // очистка хранилища
}
