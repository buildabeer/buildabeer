import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';

@Directive({
  selector: '[phValidator][ngModel],[phValidator][formControl],[phValidator][formControlName]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PhValidator,
      multi: true
    }
  ]
})

export class PhValidator implements Validator {
  validator: ValidatorFn;

  constructor() { this.validator = this.phValidator(); }

  validate(control: FormControl) {
    return this.validator(control);
  }

  phValidator(): ValidatorFn {
    return (control: FormControl) => {
      const v = control.value;

      if (v < 0 || v > 14) {
        return {
          phvalidator: {
            valid: false
          }
        };
      }

      return null;
    };
  }
}
