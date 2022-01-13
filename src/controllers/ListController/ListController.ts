import { parseJsonSourceFileConfigFileContent } from "typescript";
import { Controller, Events, HeroesEvent, ListItem, Subscriber } from "../../types/types";

const CLASS_NAME = 'list-view';

class ListController implements Controller, Subscriber {
    id: number = 100;
    items: Array<ListItem> = [];
    parentElement: HTMLElement;
    constructor(element: HTMLElement) {
        this.parentElement = element;
    }

    update(event: HeroesEvent) {
        if (event.type === Events.UPDATE_MARVEL) {
            this.items = event.payload;
            this.render();
        }
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