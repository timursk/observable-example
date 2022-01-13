import { ActionTypes, Controller } from "../../types/types";

class InputController implements Controller {
    parentElement: HTMLElement;
    onChange: (value?: string) => void;
    onDelete: (type: ActionTypes) => void;
    constructor(parentElement: HTMLElement, onChange?: (value?: string) => void, onDelete?: (type: ActionTypes) => void) {
        this.parentElement = parentElement;
        this.onChange = onChange;
        this.onDelete = onDelete;
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
        const button = document.createElement('button');
        button.innerHTML = 'Delete DC';
        button.addEventListener('click', (e) => {
            this.onDelete?.(ActionTypes.DC);
        });
        this.parentElement.appendChild(button);
        const buttonMarvel = document.createElement('button');
        buttonMarvel.innerHTML = 'Delete Marvel';
        buttonMarvel.addEventListener('click', (e) => {
            this.onDelete?.(ActionTypes.MARVEL);
        });
        this.parentElement.appendChild(buttonMarvel);
    }

}

export default InputController;