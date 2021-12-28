import { Controller } from "../../types/types";

class InputController implements Controller {
    parentElement: HTMLElement;
    onChange: (value?: string) => void;
    constructor(parentElement: HTMLElement, onChange?: (value?: string) => void) {
        this.parentElement = parentElement;
        this.onChange = onChange;
    }

    render() {
        if (!this.parentElement) {
            return;
        }
        const input = document.createElement('input');
        input.type = 'text';
        input.addEventListener('change', (e) => {
            this.onChange?.((e.target as HTMLInputElement).value);
        });
        this.parentElement.appendChild(input);
    }

}

export default InputController;