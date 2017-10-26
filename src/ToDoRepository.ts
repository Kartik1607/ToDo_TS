import {ToDoItem} from './IToDoItem';
import constants from './Constants';
import storage from './LocalStorageService';

class ToDoRepository {
    items: ToDoItem[];

    constructor() {
        this.items = storage.get();
        this.items = this.items ? this.items : [];
    }

    private getIndexById(id: number) : number {
        let index = -1;
        for(let i = 0 ; i < this.items.length; ++i) {
            if(this.items[i].id === id) {
                return i;
            }
        }
        return index;
    }

    public addItem(item: ToDoItem): ToDoItem {
        item.id = Date.now();
        item.status = constants.STATUS_ACTIVE;
        this.items.push(item);
        storage.set(this.items);
        return item;
    }

    public removeItem(id: number) {
        let index = this.getIndexById(id);
        this.items[index].status = constants.STATUS_DELETED;
        storage.set(this.items);
    }

    public completeItem(id: number) {
        let index = this.getIndexById(id);
        this.items[index].status = constants.STATUS_COMPLETED;
        storage.set(this.items);
    }

    public activateItem(id: number) {
        let index = this.getIndexById(id);
        this.items[index].status = constants.STATUS_ACTIVE;
        storage.set(this.items);
    }

    public getItem(id: number) : ToDoItem {
        return this.items[this.getIndexById(id)];
    }

    public getAllItems(): ToDoItem[] {
        return this.items;
    }

    public editElement(id: number, value: string) {
        this.items[this.getIndexById(id)].name = value;
        storage.set(this.items);
    }
}

export default new ToDoRepository();