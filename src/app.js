import './styles.css';
import {createModal, isValid} from "./utils";
import {Question} from "./question";
import {authWithEmailAndPassword, getAuthForm} from "./auth";

const modalButton = document.getElementById('modal-btn');
const form = document.getElementById('form');
const input = form.querySelector('#question-input');
const submitButton = form.querySelector('#submit');

window.addEventListener('load', Question.renderList);

input.addEventListener('input', () => {
    submitButton.disabled = !isValid(input.value);
});

const submitFormHandler = e => {
    e.preventDefault();
    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }
        submitButton.disabled = true;
        Question.create(question).then(() => {
            input.value = '';
            input.className = '';
            submitButton.disabled = false;
        })
    }
}

form.addEventListener('submit', submitFormHandler);

const renderModalAfterAuth = content => {
    if (typeof content === 'string') {
        createModal('Error!', content)
    } else {
        createModal('List questions', Question.listToHTML(content))
    }
}
const authFormHandler = e => {
    e.preventDefault();
    const button = e.target.querySelector('button');
    const email = e.target.querySelector('#email').value;
    const password = e.target.querySelector('#password').value;
    button.disabled = true;
    authWithEmailAndPassword(email, password)
        .then(Question.fetch)
        .then(renderModalAfterAuth)
        .then(() => button.disabled = false)
}
const openModal = () => {
    createModal('Authorization', getAuthForm());
    document
        .getElementById('auth-form')
        .addEventListener('submit', authFormHandler, {once: true})
}

modalButton.addEventListener('click', openModal);