import { Controller, ListItem, Subscriber } from "../../types/types";
import { Controllers } from "../../utils/constants";
import StatisticsView from '../../views/Statistics/Statistics.html';

const CLASS_NAME = 'statistics__count'

class StatisticsController implements Controller, Subscriber {
    constructor(parentElement: HTMLElement) {
        this.parentElement = parentElement;
    }
    id: number = Controllers.STATISTICS_CONTROLLER;
    parentElement: HTMLElement;
    count: number = 0;

    updateCount() {
        const countElement = this.parentElement?.querySelector?.(`.${CLASS_NAME}`);

        if (!countElement) {
            return;
        }
        countElement.innerHTML = `${this.count.toString()} superheroes`;
    }

    render() {
        if (!this.parentElement) {
            return;
        }
        const container = document.createElement('div');
        container.innerHTML = StatisticsView;
        this.parentElement.append(container);
        this.updateCount();
    }

    update(context: ListItem[]) {
        this.count = context && context.length || 0;
        this.updateCount();
    }
}

export default StatisticsController;