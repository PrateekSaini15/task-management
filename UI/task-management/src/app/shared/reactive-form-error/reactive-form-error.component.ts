import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-reactive-form-error',
  imports: [CommonModule],
  templateUrl: './reactive-form-error.component.html',
  styleUrl: './reactive-form-error.component.scss'
})
export class ReactiveFormErrorComponent {
  @Input() reactiveFormControl: AbstractControl<any> | null = null;
}

