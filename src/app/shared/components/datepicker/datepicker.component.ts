import {
  Component,
  ElementRef,
  forwardRef,
  input,
  Input,
  viewChild,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: 'datepicker.component.html',
  providers: [
    provideNativeDateAdapter(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    },
  ],
  standalone: true,
  imports: [MatIconModule, MatInputModule, MatDatepickerModule, FormsModule],
  styles: [
    `
      .focused {
        @apply outline-blue-500 outline outline-1;
      }
    `,
  ],
})
export class DatepickerComponent implements ControlValueAccessor {
  datepickerContainer = viewChild<ElementRef<HTMLDivElement>>('datepickerContainer');

  placeholder = input('');
  max = input<Date | null>(null);
  min = input<Date | null>(null);

  private _value: Date | null = null;

  onChange: (value: Date | null) => void = () => {};
  onTouched: () => void = () => {};

  get value(): Date | null {
    return this._value;
  }

  set value(val: Date | null) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  writeValue(value: Date | null): void {
    this._value = value;
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // TODO: Handle disabled state if needed
  }

  onFocus(): void {
    this.datepickerContainer()?.nativeElement.classList.add('focused');
  }

  onBlur(): void {
    this.datepickerContainer()?.nativeElement.classList.remove('focused');
    this.onTouched();
  }
}
