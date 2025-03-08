import {
  Component,
  ElementRef,
  forwardRef,
  input,
  signal,
  viewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
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
  control = input<AbstractControl<any, any> | null>();

  inputTypes = InputTypes;

  error = signal('');
  onPasswordToggle(): void {
    this.isPasswordHidden.update((value) => !value);
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
    this.onChange(value);
    this.onTouched();

    if (this.control()) {
      const firstError = Object.keys(this.control()?.errors || {})[0];
      if (!firstError) {
        this.error.set('');
        return;
      }

      switch (firstError) {
        case 'minlength':
          this.error.set(
            `Password must be at least ${
              this.control()?.errors?.[firstError]?.requiredLength
            } characters long`
          );
          break;

        case 'maxlength':
          this.error.set(
            `Password must be maximum ${
              this.control()?.errors?.[firstError]?.requiredLength
            } characters long`
          );
          break;

        case 'required':
          this.error.set(`Required`);
          break;

        case 'uppercaseLowercase':
          this.error.set(
            'Password must contain at least one uppercase letter and one lowercase letter'
          );
          break;

        default:
          this.error.set('Error: ' + this.control()?.errors?.[firstError]);
      }
    }
  }
}
