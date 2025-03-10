import { AbstractControl, ValidationErrors } from '@angular/forms';

export const uppercaseLowercaseValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const value = control.value;
  if (!/[A-Z]/.test(value) || !/[a-z]/.test(value)) {
    return { uppercaseLowercase: true };
  }
  return null;
};
