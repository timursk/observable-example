import List from '../../models/List';
import HeroesService from '../../services/HeroesService';
import { ActionTypes } from '../../types/types';
import { Controllers } from '../../utils/constants';
import DCListController from '../DCListController/DCListController';
import DCStatisticsController from '../DCStatisticsController/DCStatisticsController';
import InputController from '../InputController/InputController';
import ListController from '../ListController/ListController';
import StatisticsController from '../StatisticsController/StatisticsController';


class App {
  controllers = new Map();
  heroesService = new HeroesService();
  model = new List();

  init() {
    const parent = document.querySelector<HTMLElement>('.main-root');
    const listController = new ListController(parent);
    const inputController = new InputController(
      parent,
      this.onChange.bind(this),
      this.onDelete.bind(this)
      );
    const staticsController = new StatisticsController(parent);
    const dcListController = new DCListController(parent);
    const dcStatisticsController = new DCStatisticsController(parent);
    this.controllers.set(Controllers.INPUT_CONTROLLER, inputController);
    this.controllers.set(Controllers.STATISTICS_CONTROLLER, staticsController);
    this.controllers.set(Controllers.LIST_CONTROLLER, listController);
    this.controllers.set(Controllers.DC_STATISTICS_CONTROLLER, dcStatisticsController);
    this.controllers.set(Controllers.DC_LIST_CONTROLLER, dcListController);
    this.controllers.forEach((val) => {
      val.render();
    });

    this.model.subscribe(listController);
    this.model.subscribe(staticsController);
    this.model.subscribe(dcListController);
    this.model.subscribe(dcStatisticsController);
    const heroes = this.heroesService.getHeroes();
    this.model.addItems(heroes);
  }

  onChange(value: string) {
    if (!value) {
      return;
    }
    this.model.addItem(value);
  }

  onDelete(type: ActionTypes) {
    this.model.deleteAllItems(type);
  }
}

export default App;