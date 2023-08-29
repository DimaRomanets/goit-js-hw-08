import throttle from 'lodash.throttle';



const LOCAL_KEY = 'feedback-form-state';

const keyForm = document.querySelector('.feedback-form');

keyForm.addEventListener('input', throttle(onInputData, 500));
keyForm.addEventListener('submit', onFormSubmit);

let dataForm = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {};
const { email, message } = keyForm.elements;
reloadPage();

function onInputData(e) {
  dataForm = { email: email.value, message: message.value };
  localStorage.setItem(LOCAL_KEY, JSON.stringify(dataForm));
}

function reloadPage() {
  if (dataForm) {
    email.value = dataForm.email || '';
    message.value = dataForm.message || '';
  }
}

function onFormSubmit(e) {
  e.preventDefault();
  
  
  if (email.value.trim() === '' || message.value.trim() === '') {
    return alert('Будь ласка заповніть всі поля!');
  }
 
  console.log({ email: email.value.trim(), message: message.value.trim() });

  localStorage.removeItem(LOCAL_KEY);
  e.currentTarget.reset();
  dataForm = {};
}

