import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IdeasStore } from '../../../store/ideas/ideas.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { createFormData } from '@shared';

@Component({
  selector: 'add-modal',
  templateUrl: 'add-modal.component.html',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogContent,
    MatDialogTitle,
    MatInputModule,
  ],
})
export class AddModalComponent implements OnInit {
  dialogRef = inject(MatDialogRef);
  formBuilder = inject(FormBuilder);
  ideasStore = inject(IdeasStore);
  destroyRef = inject(DestroyRef);

  isLoading = signal(false);
  categories = computed(() => {
    return this.ideasStore
      .allCategories()
      .map(category => ({ id: category.id, title: category.name }));
  });
  form!: FormGroup;

  ngOnInit() {
    if (
      !this.ideasStore.allCategories() ||
      this.ideasStore.allCategories().length === 0
    ) {
      this.ideasStore
        .getAllCategories()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe();
    }

    this.form = this.formBuilder.group({
      categoryId: [null, Validators.required],
      title: [null, [Validators.required, Validators.minLength(3)]],
      description: [null, [Validators.required, Validators.minLength(15)]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.isLoading.set(true);

    const formData = createFormData(this.form);

    this.ideasStore
      .createIdea(formData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.dialogRef.close();
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }
}
