import {ToDoItem} from './IToDoItem'

const KEY_LS: string = 'KEY_LS';

class LocalStorageService {
    public set(data: ToDoItem[]) {
        window.localStorage.setItem(KEY_LS, JSON.stringify(data));
    }

    public get() {
        return JSON.parse(window.localStorage.getItem(KEY_LS));
    }
};

export default new LocalStorageService();