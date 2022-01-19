export interface ListItem {
  name: string;
}

export interface Controller {
  parentElement: HTMLElement;
  render: () => void;
}

export interface Subscriber {
  id: number;
  update: (event: InputEvents) => void;
}

export interface Publisher {
  subscribers: Subscriber[];
  subscribe: (subscriber: Subscriber) => void;
  unsubscribe: (subscriberId: number) => void;
  notifySubscribers: (event: InputEvents) => void;
}

export enum Events {
  UPDATE_LIST
}

export interface InputEvents {
  type: Events;
  payload?: ListItem[];
}
