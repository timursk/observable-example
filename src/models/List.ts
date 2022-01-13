import { ActionTypes, Events, HeroesEvent, ListItem, Publisher, Subscriber } from "../types/types";
import { DC_SUPERHEROES, MARVEL_SUPERHEROES } from "../utils/constants";

class List implements Publisher {
    private marvelList: Array<ListItem>;
    private dcList: Array<ListItem>;
    subscribers: Subscriber[];
    events: {
        [Events.UPDATE_DC]: []
    }
    constructor() {
        this.subscribers = [];
        this.marvelList = [];
        this.dcList = [];
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

    notifySubscribers(event: HeroesEvent) {
        this.subscribers.forEach((subscr) => subscr.update(event));
    };

    addItem(item: string) {
        const event = this.sortItemAndGetEvent(item);
        this.notifySubscribers(event);
    }

    private sortItemAndGetEvent(item: string): HeroesEvent {
        if (MARVEL_SUPERHEROES.find((name) => name.toLowerCase() === item.toLowerCase())) {
            this.marvelList.push({
                name: item
            });
            return {
            type: Events.UPDATE_MARVEL,
            payload: this.marvelList
        };
        } else if (DC_SUPERHEROES.find((name) => name.toLowerCase() === item.toLowerCase())) {
            this.dcList.push({
                name: item
            });
            return {
                type: Events.UPDATE_DC,
                payload: this.dcList
            };
        }
    }

    addItems(items: Array<string>) {
        if (!Array.isArray(items) || !items.length) {
            return;
        }
        items.forEach((item) => this.sortItemAndGetEvent(item));
        this.notifySubscribers({
            type: Events.UPDATE_DC,
            payload: this.dcList
        });
        this.notifySubscribers({
            type: Events.UPDATE_MARVEL,
            payload: this.marvelList
        });
    }

    deleteAllItems(type: ActionTypes) {
        switch (type) {
            case ActionTypes.DC: {
                this.dcList = [];
                this.notifySubscribers({
                    type: Events.UPDATE_DC,
                    payload: this.dcList
                });
                return;
            }
            case ActionTypes.MARVEL: {
                this.marvelList = [];
                this.notifySubscribers({
                    type: Events.UPDATE_MARVEL,
                    payload: this.marvelList
                });
                return;
            }
            default: return;
        }
    }
}

export default List;