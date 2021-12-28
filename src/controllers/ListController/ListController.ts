import { parseJsonSourceFileConfigFileContent } from "typescript";
import { Controller, ListItem, Subscriber } from "../../types/types";
import ListView from '../../views/ListView/ListView.html';

const CLASS_NAME = 'list-view';

class ListController implements Controller, Subscriber {
    id: number = 100;
    items: Array<ListItem> = [];
    parentElement: HTMLElement;
    constructor(element: HTMLElement) {
        this.parentElement = element;
    }

    update(context: ListItem[]) {
        this.items = context;
        this.render();
    };

    getItem(item: ListItem) {
        const li = document.createElement('li');
        li.id = item.name;
        li.innerHTML = item.name;
        return li;
    }

    render() {
        const existing = this.parentElement.querySelector<HTMLElement>(`.${CLASS_NAME}`);
        if (existing) {
            existing.remove();
        }
        const parent = document.createElement('ul');
        parent.classList.add(CLASS_NAME);
        this.items.forEach((item) => {
            parent.append(this.getItem(item));
        })
        this.parentElement.append(parent);
    }
}

export default ListController;