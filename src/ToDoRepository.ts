import {ToDoItem} from './IToDoItem'
import constants from './Constants'

class ToDoRepository {
    items: ToDoItem[];

    constructor() {
        this.items = [];
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
        return item;
    }

    public removeItem(id: number) {
        let index = this.getIndexById(id);
        this.items[index].status = constants.STATUS_DELETED;
    }

    public completeItem(id: number) {
        let index = this.getIndexById(id);
        this.items[index].status = constants.STATUS_COMPLETED;
    }

    public activateItem(id: number) {
        let index = this.getIndexById(id);
        this.items[index].status = constants.STATUS_ACTIVE;
    }

    public getItem(id: number) : ToDoItem {
        return this.items[this.getIndexById(id)];
    }

    public getAllItems(): ToDoItem[] {
        return this.items;
    }

    public editElement(id: number, value: string) {
        this.items[this.getIndexById(id)].name = value;
    }
}

export default new ToDoRepository();