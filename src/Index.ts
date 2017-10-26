import ToDo from './ToDoRepository'
import UI from './ui'
import * as toastr from 'toastr'

let inputElement = <HTMLInputElement> document.getElementById('inputNewToDo');

declare global {
    interface Window { App: any; }
}

window.App = {};

window.App.postToDo = function(){
    let item = ToDo.addItem({name: inputElement.value});
    UI.addItem(item);
    UI.resetInput();
};

window.App.handleActiveCheckboxClick = function(checkBox) {
    UI.handleActiveCheckboxClick(checkBox);
};

window.App.onComplete = function() {
    UI.onComplete();
};

window.App.onDeleteActive = function () {
    UI.onDeleteActive();
};


window.App.handleCompleteCheckboxClick = function (checkBox) {
    UI.handleCompleteCheckboxClick(checkBox);
};

window.App.onActivate = function() {
    UI.onActivate();
};

window.App.onDeleteComplete = function() {
  UI.onDeleteComplete();
};

window.App.onToDoEdit = function(id: number, value: string) {
    ToDo.editElement(id, value);
    toastr.success('Success', 'ToDo edited :)')
};

window.App.refreshList = function() {
    UI.refreshList();
};

window.onload = function() {
    UI.refreshList();
}