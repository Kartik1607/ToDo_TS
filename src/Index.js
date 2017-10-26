"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ToDoRepository_1 = require("./ToDoRepository");
var ui_1 = require("./ui");
var inputElement = document.getElementById('inputNewToDo');
window.postToDo = function (event) {
    var item = ToDoRepository_1.default.addItem({ name: inputElement.value });
    ui_1.default.addItem(item);
    ui_1.default.resetInput();
};
