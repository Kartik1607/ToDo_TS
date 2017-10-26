"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = require("./Constants");
//___HTML CONSTANTS___
//LISTS
var TODO_LIST_ACTIVE = 'list_active';
var TODO_LIST_COMPLETED = 'list_completed';
var TODO_LIST_DELETED = 'list_deleted';
//COL
var TODO_COL_COMPLETE = 'col_complete';
var TODO_COL_DELETE = 'col_delete';
//BUTTONS
var BUTTONS_ACTIVE = 'buttons_active';
var BUTTONS_COMPLETE = 'buttons_complete';
var BUTTON_COMPLETED = 'button_completed';
var BUTTON_DELETED = 'button_deleted';
//INPUT
var INPUT_NEW_TODO_ID = 'inputNewToDo';
//ATTRIBUTES
var ATTR_STYLE = 'style';
var ATTR_ID = '_ID';
var ATTR_ONCLICK = 'onclick';
var Input = document.getElementById(INPUT_NEW_TODO_ID);
var ListActive = document.getElementById(TODO_LIST_ACTIVE);
var ListCompleted = document.getElementById(TODO_LIST_COMPLETED);
var ListDeleted = document.getElementById(TODO_LIST_DELETED);
var UI = (function () {
    function UI() {
    }
    UI.prototype.addItem = function (data) {
        switch (data.status) {
            case Constants_1.default.STATUS_ACTIVE: {
                ListActive.innerHTML += "<li><input type='checkbox' " + ATTR_ID + "=" + data.id + "\n            onclick='handleActiveCheckboxClick(this)'/> " + data.name + "</li>";
                break;
            }
            case Constants_1.default.STATUS_COMPLETED: {
                ListCompleted.innerHTML += "<li><input type='checkbox' " + ATTR_ID + "=" + data.id + "\n            onclick='handleCompleteCheckboxClick(this)'/> " + data.name + "</li>";
                break;
            }
            case Constants_1.default.STATUS_DELETED: {
                ListDeleted.innerHTML += "<li>" + data.name + "</li>";
                break;
            }
            default: return '';
        }
    };
    UI.prototype.resetInput = function () {
        Input.value = "";
    };
    return UI;
}());
exports.default = new UI();
