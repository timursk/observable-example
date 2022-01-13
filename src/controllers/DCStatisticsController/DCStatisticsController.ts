import { Controller, Events, HeroesEvent, ListItem, Subscriber } from "../../types/types";
import { Controllers } from "../../utils/constants";

const CLASS_NAME = 'dc-statistics__count'

class DCStatisticsController implements Controller, Subscriber {
    constructor(parentElement: HTMLElement) {
        this.parentElement = parentElement;
    }
    id: number = Controllers.DC_STATISTICS_CONTROLLER;
    parentElement: HTMLElement;
    count: number = 0;

    updateCount() {
        const countElement = this.parentElement?.querySelector?.(`.${CLASS_NAME}`);

        if (!countElement) {
            return;
        }
        countElement.innerHTML = `${this.count.toString()} DC superheroes`;
    }

    render() {
        if (!this.parentElement) {
            return;
        }
        const container = document.createElement('div');
        container.innerHTML = `<div class="dc-statistics__root">
        <div class="dc-statistics__count"></div>
    </div>`;
        this.parentElement.append(container);
        this.updateCount();
    }

    update(event: HeroesEvent) {
        const {
            type,
            payload
        } = event;
        if (type === Events.UPDATE_DC) {
            this.count = payload && payload.length || 0;
            this.updateCount();
        }
    }
}

export default DCStatisticsController;