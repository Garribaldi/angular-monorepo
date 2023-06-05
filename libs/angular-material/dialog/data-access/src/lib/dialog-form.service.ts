import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DialogFormService {
  private _form = this.fb.group({
    description: ['', []],
    category: ['', []],
    date: [new Date(), []],
  });

  private _categories = ['Beginner', 'Advanced', 'Pro'];

  get form() {
    return this._form;
  }

  get categories() {
    return this._categories;
  }

  constructor(private readonly fb: FormBuilder) {}
}
