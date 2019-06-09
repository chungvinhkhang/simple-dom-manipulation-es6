const deleteButtonClassName = 'record__delete-button';
const addFormClassName = 'record__add-form';

const createNameTdHtml = (name) => `<td>${name}</td>`;

const createGradeTdHtml = (grade) => `<td>${grade}</td>`;

const createRowCommandTdHtml = () => `<td><button type="button" class="${deleteButtonClassName}">X</button></td>`;

const createTrHtml = (name, grade) => `<tr>${createNameTdHtml(name)} ${createGradeTdHtml(grade)} ${createRowCommandTdHtml()}</tr>`;

const createHeaderHtml = () => 
    `<tr>
        <th>Name</th>
        <th>Grade</th>
        <th></th>
    </tr>`;

const createAddFormHtml = () => 
    `<form class="${addFormClassName}">  
        <input autofocus type="text" name="name" />
        <input type="text" name="grade" />
        <input type="submit" value="Thêm" />
    </form>`;

const createTableHtml = (list) => 
    `<table>
        <thead>${createHeaderHtml()}</thead>
        <tbody>${list.map((value, index) => createTrHtml(value.name, value.grade)).join('')}</tbody>
    </table>`;

const createScoreBoardContainer = (list) =>
    `<div>
        ${createTableHtml(list)}
        ${createAddFormHtml()}
    </div>`;

const bindDeleteEvent = (trElement) => {
    let deleteButton = trElement.querySelector(`.${deleteButtonClassName}`);
    deleteButton.addEventListener('click', () => deleteHandler(trElement));
}

const bindEvents = () => {
    let trElements = document.body.querySelectorAll('table > tbody > tr');
    for(let trElement of trElements) {
        bindDeleteEvent(trElement);
    }

    let addFormElement = document.body.querySelector(`.${addFormClassName}`);
    addFormElement.addEventListener('submit', (evt) => submitAddFormHandler(evt, addFormElement));
};

function deleteHandler(trElement){
    trElement.parentNode.removeChild(trElement);
}

function submitAddFormHandler(evt, formElement){
    evt.preventDefault();
    let dummyWrapperElement = document.createElement('template');
    dummyWrapperElement.innerHTML = createTrHtml(formElement.name.value, formElement.grade.value);
    let addedTr = dummyWrapperElement.content.firstChild;

    let bodyElement = document.body.querySelector('table > tbody');
    bodyElement.appendChild(addedTr);
    bindDeleteEvent(addedTr);

    formElement.reset(); 
    formElement.name.focus();
}

function load(list){
    const dummyWrapperElement = document.createElement('template');
    dummyWrapperElement.innerHTML = createScoreBoardContainer(list);
    document.body.appendChild(dummyWrapperElement.content.firstChild);
    bindEvents();
}

export function init(list = []) {
    load(list);
}