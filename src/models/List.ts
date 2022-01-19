import { Events, InputEvents, ListItem, Publisher, Subscriber } from '../types/types';

class List implements Publisher {
  subscribers: Subscriber[];
  list: ListItem[];
  constructor() {
    this.subscribers = [];
    this.list = [];
  }
  subscribe(subscriber: Subscriber) {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriberId: number) {
    const idx = this.subscribers.findIndex(sub => sub.id === subscriberId);
    this.subscribers.splice(idx, 1);
  }

  notifySubscribers(event: InputEvents) {
    this.subscribers.forEach(sub => sub.update(event));
  }

  addItem(item: string) {
    this.list.push({
      name: item
    });
    const event = {
      type: Events.UPDATE_LIST,
      payload: this.list
    };
    this.notifySubscribers(event);
  }
}

export default List;
