import { Component, ElementRef, input, output, viewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-group',
  imports: [FormsModule],
  templateUrl: './input-group.component.html',
  styleUrl: './input-group.component.scss',
})
export class InputGroupComponent {
  inputCount = input(6);
  onValuesFilled = output<string[]>();

  inputs = viewChildren<ElementRef<HTMLInputElement>>('input');

  readonly inputsArray = Array.from({ length: this.inputCount() }, (_, i) => i);

  onInputFill(id: string): void {
    const { input, currIndex } = this.getCurrentInput(id)!;

    input.value = input.value.trim();
    if (input.value.length === 0) {
      input?.classList.remove('active');
      input.value = '';
      this.inputs()
        .at(currIndex !== 0 ? currIndex - 1 : currIndex)
        ?.nativeElement.focus();

      return;
    }

    input.classList.add('active');

    if (currIndex < this.inputCount() - 1) {
      this.inputs()
        .at(currIndex + 1)
        ?.nativeElement.focus();

      const isAllFilled = this.inputs().every(inp => inp.nativeElement.value.trim());
      if (isAllFilled) {
        this.emit();
      }
    } else {
      this.emit();
    }
  }

  onFocus(id: string): void {
    const { input } = this.getCurrentInput(id);

    setTimeout(() => {
      input.setSelectionRange(input.value.length, input.value.length);
    }, 0);
  }

  getCurrentInput(id: string): {
    input: HTMLInputElement;
    currIndex: number;
  } {
    const currentInputIndex = this.inputs().findIndex(inp => {
      return inp.nativeElement.id === id;
    });

    return {
      input: this.inputs().at(currentInputIndex)!.nativeElement,
      currIndex: currentInputIndex,
    };
  }

  emit(): void {
    const values = this.inputs().map(input => input.nativeElement.value);
    this.onValuesFilled.emit(values);
  }
}
