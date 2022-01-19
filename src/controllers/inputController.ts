import { Controller } from '../types/types';
import { createInputView } from '../views/input';

class InputController implements Controller {
  parentElement: HTMLElement;
  onChange: (value: string) => void;
  constructor(parentElement: HTMLElement, onChange: (value: string) => void) {
    this.parentElement = parentElement;
    this.onChange = onChange;
  }

  render() {
    if (!this.parentElement) {
      return;
    }
    const input = createInputView();
    input.addEventListener('change', e => {
      this.onChange((e.target as HTMLInputElement).value);
    });
    this.parentElement.append(input);
  }
}

export default InputController;
