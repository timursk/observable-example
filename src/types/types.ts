export interface ListItem {
    name: string;
}

export interface Controller {
    parentElement: HTMLElement;
    render: () => void;
}

export interface Subscriber {
    id: number;
    update: (event: HeroesEvent) => void;
}

export interface Publisher {
    subscribers: Subscriber[];
    subscribe: (subscriber: Subscriber) => void;
    unsubscribe: (subscriberId: number) => void;
    notifySubscribers: (event: HeroesEvent) => void;
}

export enum Events {
    UPDATE_MARVEL,
    UPDATE_DC
}

export interface HeroesEvent {
    type: Events;
    payload?: Array<ListItem>;
}

export enum ActionTypes {
    MARVEL,
    DC
}