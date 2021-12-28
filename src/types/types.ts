export interface ListItem {
    name: string;
}

export interface Controller {
    parentElement: HTMLElement;
    render: () => void;
}

export interface Subscriber {
    id: number;
    update: (context: ListItem[]) => void;
}

export interface Publisher {
    subscribers: Subscriber[];
    subscribe: (subscriber: Subscriber) => void;
    unsubscribe: (subscriberId: number) => void;
    notifySubscribers: () => void;
}