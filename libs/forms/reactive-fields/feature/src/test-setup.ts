import 'jest-preset-angular/setup-jest';
import { FormControl, NgControl } from "@angular/forms";

export const NG_CONTROL_PROVIDER = {
  provide: NgControl,
  useClass: class extends NgControl {
    control = new FormControl();

    /* eslint-disable @typescript-eslint/no-empty-function */
    viewToModelUpdate() {
    }

    /* eslint-enable @typescript-eslint/no-empty-function */
  }
};
