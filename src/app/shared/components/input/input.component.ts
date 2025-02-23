import {
  Component,
  ElementRef,
  forwardRef,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

enum InputTypes {
  Text = 'text',
  Password = 'password',
  Email = 'email',
}

@Component({
  selector: 'app-input',
  templateUrl: 'input.component.html',
  imports: [MatIconModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  styles: [
    `
      .focused {
        @apply outline-blue-500 outline outline-1;
      }
    `,
  ],
})
export class InputComponent implements ControlValueAccessor {
  inputContainer = viewChild<ElementRef<HTMLDivElement>>('inputContainer');
  isPasswordHidden = signal(false);

  type = input<'text' | 'password' | 'email'>(InputTypes.Text);
  placeholder = input<string>('');
  icon = input<string>('');

  inputTypes = InputTypes;

  onPasswordToggle(): void {
    this.isPasswordHidden.update(value => !value);
  }

  onFocus(): void {
    this.inputContainer()?.nativeElement.classList.add('focused');
  }

  onBlur(): void {
    this.inputContainer()?.nativeElement.classList.remove('focused');
  }

  // --------- Custom value accessor logic ---------
  innerValue = '';
  isDisabled: boolean = false;
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.innerValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onInputChange(value: string) {
    this.innerValue = value;
    this.onChange(value); // Notify Angular about the change
    this.onTouched(); // Mark as touched when the user interacts
  }
}
