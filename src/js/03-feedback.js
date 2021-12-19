import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  mail: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('input', throttle(onTextareaInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

onSaveForm();

function onTextareaInput(event) {
  formData[event.target.name] = event.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));

  event.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onSaveForm() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedData) {
    refs.mail.value = savedData.email;
    refs.textarea.value = savedData.message;
  }
}
