import { Component, ElementRef, input, output, viewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-group',
  imports: [FormsModule],
  templateUrl: './input-group.component.html',
  styleUrl: './input-group.component.scss',
})
export class InputGroupComponent {
  inputCount = input(4);
  onValuesFilled = output<string[]>();

  inputs = viewChildren<ElementRef<HTMLInputElement>>('input');

  readonly inputsArray = Array.from({ length: this.inputCount() }, (_, i) => i);
  onInputFill(id: string): void {
    const currentInputIndex = this.inputs().findIndex(inp => {
      return inp.nativeElement.id === id;
    });

    const input = this.inputs().at(currentInputIndex)?.nativeElement!;

    input.value = input.value.trim();

    if (input.value.length === 0) {
      input?.classList.remove('active');
      input.value = '';
      return;
    }

    input.classList.add('active');

    if (currentInputIndex < this.inputCount() - 1) {
      this.inputs()
        .at(currentInputIndex + 1)
        ?.nativeElement.focus();

      const isAllFilled = this.inputs().every(inp => inp.nativeElement.value.trim());
      if (isAllFilled) {
        this.emit();
      }
    } else {
      this.emit();
    }
  }

  emit(): void {
    const values = this.inputs().map(input => input.nativeElement.value);
    this.onValuesFilled.emit(values);
  }
}
