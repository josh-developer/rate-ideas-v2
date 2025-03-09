import { Component, ElementRef, inject, Input, ViewChild, signal, OnInit, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styles: [
    `
      .focused {
        @apply outline-blue-500 outline outline-1;
      }
    `,
  ],
  providers: [provideNativeDateAdapter()],
  standalone: true,
  imports: [MatIconModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule],
})
export class DatepickerComponent implements OnInit {
  @ViewChild('datepickerContainer') datepickerContainer!: ElementRef<HTMLDivElement>;

  @Input() placeholder: string = 'Select Date';
  @Input() max: Date | null = null;
  @Input() min: Date | null = null;
  @Input() control: FormControl<any> = new FormControl(null);
  @Output() dateSelected = new EventEmitter<Date>(); // ✅ Output Event qo'shildi

  selectedDate = signal<Date | null>(null);

  ngOnInit() {
    this.control.valueChanges.subscribe(value => {
      this.selectedDate.set(value);
      console.log(value)
    });
  }

  onDateChange(event: any) {
    if (event.value) {
      this.dateSelected.emit(event.value); // ✅ Sana tanlanganda yuboriladi
      console.log("DatepickerComponent: Tanlangan sana:", event.value);
    }
  }

  onFocus(): void {
    if (this.datepickerContainer) {
      this.datepickerContainer.nativeElement.classList.add('focused');
    }
  }

  onBlur(): void {
    if (this.datepickerContainer) {
      this.datepickerContainer.nativeElement.classList.remove('focused');
    }
  }
}