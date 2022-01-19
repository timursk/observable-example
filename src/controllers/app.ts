import List from '../models/List';
import { Controlles } from '../utils/constants';
import InputController from './inputController';
import ListController from './listController';

class App {
  controllers = new Map();
  model = new List();

  init() {
    const parent = document.querySelector<HTMLElement>('.root');
    const listController = new ListController(parent);
    const inputController = new InputController(parent, this.onChange.bind(this));

    this.controllers.set(Controlles.INPUT, inputController);
    this.controllers.set(Controlles.LIST, listController);
    this.controllers.forEach(val => {
      val.render();
    });

    this.model.subscribe(listController);
  }

  onChange(value: string) {
    if (!value) {
      return;
    }
    this.model.addItem(value);
  }
}

export default App;
