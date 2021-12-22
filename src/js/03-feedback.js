import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {
  email: '',
  message: '',
};

const refs = {
  form: document.querySelector('.feedback-form'),
  mail: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

populateForm();

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm(formData) {
  formData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  refs.mail.value = formData.email;
  refs.textarea.value = formData.message;
}

function onFormSubmit(e) {
  e.preventDefault();

  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));

  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}
