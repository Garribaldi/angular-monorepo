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
    {
      key: 'select',
      type: 'select',
      props: {
        label: 'Multi Select',
        multiple: true,
        required: true,
        selectAllOption: 'Select All',
        options: [
          {value: 1, label: 'Option 1'},
          {value: 2, label: 'Option 2'},
          {value: 3, label: 'Option 3'},
          {value: 4, label: 'Option 4', disabled: true}
        ]
      }
    }
  ];

  onSubmit(model: unknown) {
    console.log(model, this.form.get('checked'));
  }
}
