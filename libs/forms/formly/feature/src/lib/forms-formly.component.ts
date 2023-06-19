import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'local-forms-formly',
  templateUrl: './forms-formly.component.html',
  styleUrls: ['./forms-formly.component.scss'],
})
export class FormsFormlyComponent {
  form = new FormGroup({});
  model = {
    email: 'email@gmail.com',
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      props: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      },
    },
    {
      key: 'checked',
      type: 'checkbox',
      props: {
        label: 'Validated',
        required: true,
      },
    },
  ];

  onSubmit(model: unknown) {
    console.log(model, this.form.get('checked'));
  }
}
