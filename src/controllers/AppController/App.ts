import List from '../../models/List';
import { Controllers } from '../../utils/constants';
import InputController from '../InputController/InputController';
import ListController from '../ListController/ListController';
import StatisticsController from '../StatisticsController/StatisticsController';


class App {
  controllers = new Map();
  model = new List();

  init() {
    const parent = document.querySelector<HTMLElement>('.main-root');
    const listController = new ListController(parent);
    const inputController = new InputController(parent, this.onChange.bind(this));
    const staticsController = new StatisticsController(parent);
    this.controllers.set(Controllers.LIST_CONTROLLER, listController);
    this.controllers.set(Controllers.INPUT_CONTROLLER, inputController);
    this.controllers.set(Controllers.STATISTICS_CONTROLLER, staticsController);
    this.controllers.forEach((val) => {
      val.render();
    });

    this.model.subscribe(listController);
    this.model.subscribe(staticsController);
    //this.controllers.set(Controllers.STATISTICS_CONTROLLER, new ListController(parent));
  }

  onChange(value: string) {
    if (!value) {
      return;
    }
    this.model.addItem(value);
  }
}

export default App;