import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  mail: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('input', throttle(onSaveInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

if (localStorage.getItem(STORAGE_KEY)) {
  populateForm();
}

function onSaveInput() {
  const {
    elements: { email, message },
  } = refs.form;

  const formData = {
    email: email.value,
    message: message.value,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm(formData) {
  formData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  refs.mail.value = formData.email;
  refs.textarea.value = formData.message;
}

function onFormSubmit(e) {
  e.preventDefault();

  const inputData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (!inputData.email || !inputData.message) {
    alert('Заполните поля формы');
    return;
  }
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));

  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}
