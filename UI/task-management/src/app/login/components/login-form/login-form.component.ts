import { Component, input, output, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginRequestModel } from 'app/login/models/login-request.model';
import { ReactiveFormErrorComponent } from 'app/shared/reactive-form-error/reactive-form-error.component';
import { ErrorModel } from 'models/error.model';
import { setServerSideErrors } from 'utils';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormErrorComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  public onSubmit = output<LoginRequestModel>();
  public serverSideErrors = input<ErrorModel[]>();

  public constructor(
    private readonly fb: FormBuilder
  ) {
    this.form = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes["serverSideErrors"] != null) {
      setServerSideErrors(this.form, changes["serverSideErrors"].currentValue as ErrorModel[])
    }
  }

  public form: FormGroup;

  public onFormSubmit() {
    this.form.markAllAsTouched();

    if (this.form.valid == false) {
      return;
    }

    const output = new LoginRequestModel();
    output.username = this.form.get("username")?.value;
    output.password = this.form.get("password")?.value;

    this.onSubmit.emit(output);
  }
}
