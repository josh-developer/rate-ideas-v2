import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: 'datepicker.component.html',
  providers: [provideNativeDateAdapter()],
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
export class DatepickerComponent {
  @ViewChild('datepickerContainer')
  datepickerContainer!: ElementRef<HTMLDivElement>;

  // 📌 Input for Parent to Set Min, Max, Placeholder
  @Input() placeholder: string = '';
  @Input() max: Date | null = null;
  @Input() min: Date | null = null;

  // 📌 Output Event to Send Date to Parent
  @Output() dateSelected = new EventEmitter<Date | null>();

  selectedDate: Date | null = null; // Stores the selected date

  // 📌 Triggered when date changes
  onDateChange(event: any) {
    this.selectedDate = event.value;
    this.dateSelected.emit(this.selectedDate); // Emit to Parent
  }

  onFocus(): void {
    this.datepickerContainer?.nativeElement.classList.add('focused');
  }

  onBlur(): void {
    this.datepickerContainer?.nativeElement.classList.remove('focused');
  }
}
