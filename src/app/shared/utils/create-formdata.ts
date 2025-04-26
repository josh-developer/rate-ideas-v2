import { Form, FormGroup } from '@angular/forms';

export function createFormData(form: FormGroup) {
  const formData = new FormData();

  Object.keys(form.controls).forEach(key => {
    const control = form.get(key);

    if (control && control.value !== null && control.value !== undefined) {
      formData.append(key, control.value);
    }
  });

  return formData;
}
