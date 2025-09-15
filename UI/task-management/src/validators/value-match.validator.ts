import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function valueMatchValidator(value1Key: string, value2Key: string, errorMessage: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const value1Control = formGroup.get(value1Key);
    const value2Control = formGroup.get(value2Key);

    if (value1Control == undefined || value2Control == undefined) {
      return null;
    }

    if (value1Control.errors != undefined || value2Control.errors?.['value-match'] != undefined) {
      return null;
    }

    if (value1Control.value !== value2Control.value) {
      value2Control.setErrors({ "value-match": true })
    }
    else {
      value2Control.setErrors(null);
    }

    return null;
  };
}
