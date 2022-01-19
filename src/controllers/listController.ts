import { Controller, Events, InputEvents, ListItem, Subscriber } from '../types/types';
import { createListView } from '../views/list';

const CLASS_NAME = 'product-list';

class ListController implements Controller, Subscriber {
  id = 200;
  items: Array<ListItem> = [];
  parentElement: HTMLElement;
  constructor(element: HTMLElement) {
    this.parentElement = element;
  }

  update(event: InputEvents) {
    if (event.type === Events.UPDATE_LIST) {
      this.items = event.payload;
      this.render();
    }
  }

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
    const list = createListView();
    this.items.forEach(item => {
      list.append(this.getItem(item));
    });
    this.parentElement.append(list);
  }
}

export default ListController;
