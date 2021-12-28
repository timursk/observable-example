import { ListItem, Publisher, Subscriber } from "../types/types";

class List implements Publisher {
    list: Array<ListItem>;
    subscribers: Subscriber[];
    constructor() {
        this.subscribers = [];
        this.list = [];
    }
    subscribe(subscriber: Subscriber) {
        this.subscribers.push(subscriber)
    };
    unsubscribe(subscriberId: number) {
        const subscrIndex = this.subscribers.findIndex((sub) => sub.id === subscriberId);
        this.subscribers = [
            ...this.subscribers.slice(0, subscrIndex),
            ...this.subscribers.slice(subscrIndex + 1)
        ];
    };
    notifySubscribers() {
        this.subscribers.forEach((subscr) => subscr.update(this.list));
    };

    addItem(item: string) {
        this.list.push({
            name: item
        });
        this.notifySubscribers();
    }
}

export default List;