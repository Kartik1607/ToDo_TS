import {ToDoItem} from "./IToDoItem";
import ToDo from './ToDoRepository'
import constants from './Constants';


//___HTML CONSTANTS___
//LISTS
const TODO_LIST_ACTIVE = 'list_active';
const TODO_LIST_COMPLETED = 'list_completed';
const TODO_LIST_DELETED = 'list_deleted';
//COL
const TODO_COL_COMPLETE = 'col_complete';
const TODO_COL_DELETE = 'col_delete';
//BUTTONS
const BUTTONS_ACTIVE = 'buttons_active';
const BUTTONS_COMPLETE = 'buttons_complete';
const BUTTON_COMPLETED = 'button_completed';
const BUTTON_DELETED = 'button_deleted';
//INPUT
const INPUT_NEW_TODO_ID = 'inputNewToDo';
//ATTRIBUTES
const ATTR_STYLE = 'style';
const ATTR_ID = '_ID';
const ATTR_ONCLICK = 'onclick';
//VISIBILITY STATE
const STATE_HIDDEN = 'visibility:hidden;';
const STATE_VISIBLE = '';
const STATE_GONE = 'display : none;';

const LISTACTIVE_HTML_HEAD = '<li style="background: GREEN; color: white"><b>ACTIVE</b></li>';
const LISTCOMPLETE_HTML_HEAD = `<li style='background: BLACK; color: white'>
                                    <b>COMPLETED</b>
                                </li>`;
const LISTDELETED_HTML_HEAD = `<li style='background: RED; color: white'>
                                    <b>DELETED</b>
                                </li>`;

const Input = <HTMLInputElement> document.getElementById(INPUT_NEW_TODO_ID);
const ListActive =  document.getElementById(TODO_LIST_ACTIVE);
const ListCompleted = document.getElementById(TODO_LIST_COMPLETED);
const ListDeleted = document.getElementById(TODO_LIST_DELETED);
const buttonsActive = <HTMLButtonElement> document.getElementById(BUTTONS_ACTIVE);
const buttonsComplete = <HTMLButtonElement> document.getElementById(BUTTONS_COMPLETE);

class UI {
    totalActiveSelected:number;
    totalCompleteSelected:number;

    constructor() {
        this.totalActiveSelected = 0;
        this.totalCompleteSelected = 0;
    }

    public addItem(data: ToDoItem) {
        switch (data.status) {
            case constants.STATUS_ACTIVE : {
                ListActive.innerHTML += `<li><input type='checkbox' ${ATTR_ID}=${data.id}
            onclick='window.App.handleActiveCheckboxClick(this)'/> 
                <input type="text" value="${data.name}" class="inputTodo"
                    onblur="window.App.refreshList()" 
                    onkeyup="if(event.keyCode == 13) window.App.onToDoEdit(${data.id}, this.value);"
                />
                </li>`;
            break;
            }

            case constants.STATUS_COMPLETED : {
                ListCompleted.innerHTML+= `<li><input type='checkbox' ${ATTR_ID}=${data.id}
            onclick='window.App.handleCompleteCheckboxClick(this)'/> ${data.name}</li>`;
            break;
            }
            case constants.STATUS_DELETED : {
                ListDeleted.innerHTML+= `<li>${data.name}</li>`;
            break;
            }
            default : return '';
        }
    }

    public handleActiveCheckboxClick(checkBox) {
        let item:HTMLInputElement = <HTMLInputElement> checkBox;
        if(item.checked) {
            ++this.totalActiveSelected;
        } else {
            --this.totalActiveSelected;
        }
        if (this.totalActiveSelected > 0) {
            buttonsActive.setAttribute(ATTR_STYLE, STATE_VISIBLE);
        } else {
            buttonsActive.setAttribute(ATTR_STYLE, STATE_HIDDEN);
        }
    }

    public handleCompleteCheckboxClick(checkBox) {
        let item:HTMLInputElement = <HTMLInputElement> checkBox;
        if(item.checked) {
            ++this.totalCompleteSelected;
        } else {
            --this.totalCompleteSelected;
        }
        if (this.totalCompleteSelected > 0) {
            buttonsComplete.setAttribute(ATTR_STYLE, STATE_VISIBLE);
        } else {
            buttonsComplete.setAttribute(ATTR_STYLE, STATE_HIDDEN);
        }
    }

    public resetInput() {
        Input.value = "";
    }

    public onDeleteActive() {
        let elements = ListActive.getElementsByTagName('input');
        for(let index = 0; index < elements.length; ++index ){
            let current: HTMLInputElement = <HTMLInputElement> elements.item(index);
            if(!current.checked) {
                continue;
            }
            let id = Number(current.getAttribute(ATTR_ID));
            ToDo.removeItem(id);
        }
        this.refreshList();
        buttonsActive.setAttribute(ATTR_STYLE, STATE_HIDDEN);
    }

    public onDeleteComplete() {
        let elements = ListCompleted.getElementsByTagName('input');
        for(let index = 0; index < elements.length; ++index ){
            let current: HTMLInputElement = <HTMLInputElement> elements.item(index);
            if(!current.checked) {
                continue;
            }
            let id = Number(current.getAttribute(ATTR_ID));
            ToDo.removeItem(id);
        }
        this.refreshList();
        buttonsComplete.setAttribute(ATTR_STYLE, STATE_HIDDEN);
    }

    public onComplete() {
        let elements = ListActive.getElementsByTagName('input');
        for(let index = 0; index < elements.length; ++index ){
            let current: HTMLInputElement = <HTMLInputElement> elements.item(index);
            if(!current.checked) {
                continue;
            }
            let id = Number(current.getAttribute(ATTR_ID));
            ToDo.completeItem(id);
        }
        this.refreshList();
        buttonsActive.setAttribute(ATTR_STYLE, STATE_HIDDEN);
    }

    public onActivate() {
        let elements = ListCompleted.getElementsByTagName('input');
        for(let index = 0; index < elements.length; ++index ){
            let current: HTMLInputElement = <HTMLInputElement> elements.item(index);
            if(!current.checked) {
                continue;
            }
            let id = Number(current.getAttribute(ATTR_ID));
            ToDo.activateItem(id)
        }
        this.refreshList();
        buttonsComplete.setAttribute(ATTR_STYLE, STATE_HIDDEN);
    }

    public refreshList() {
        ListActive.innerHTML = LISTACTIVE_HTML_HEAD;
        ListCompleted.innerHTML = LISTCOMPLETE_HTML_HEAD;
        ListDeleted.innerHTML = LISTDELETED_HTML_HEAD;
        let items: ToDoItem[] = ToDo.getAllItems();
        for(let index = 0; index < items.length; ++index) {
            this.addItem(items[index]);
        }
    }
}

export default new UI();
