"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = require("./Constants");
var ToDoRepository = (function () {
    function ToDoRepository() {
        this.items = [];
    }
    ToDoRepository.prototype.getIndexById = function (id) {
        var index = -1;
        for (var i = 0; i < this.items.length; ++i) {
            if (this.items[i].id === id) {
                return i;
            }
        }
        return index;
    };
    ToDoRepository.prototype.addItem = function (item) {
        item.id = Date.now();
        item.status = Constants_1.default.STATUS_ACTIVE;
        this.items.push(item);
        return item;
    };
    ToDoRepository.prototype.removeItem = function (id) {
        var index = this.getIndexById(id);
        this.items[index].status = Constants_1.default.STATUS_DELETED;
    };
    ToDoRepository.prototype.completeItem = function (id) {
        var index = this.getIndexById(id);
        this.items[index].status = Constants_1.default.STATUS_COMPLETED;
    };
    ToDoRepository.prototype.activateItem = function (id) {
        var index = this.getIndexById(id);
        this.items[index].status = Constants_1.default.STATUS_ACTIVE;
    };
    return ToDoRepository;
}());
exports.default = new ToDoRepository();
