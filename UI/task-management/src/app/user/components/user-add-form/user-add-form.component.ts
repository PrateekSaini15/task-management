import { W } from "@angular/cdk/keycodes";
import { CommonModule, JsonPipe } from "@angular/common";
import { Component, input, output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormErrorComponent } from "app/shared/reactive-form-error/reactive-form-error.component";
import { UserAddRequestModel } from "app/user/models/user-add-request.model";
import { Ddl } from "constants/ddl.constant";
import { DdlModel } from "models/ddl.model";
import { ErrorModel } from "models/error.model";
import { DropdownService } from "services/dropdown.service";
import { setServerSideErrors } from "utils";
import { valueMatchValidator } from "validators/value-match.validator";

@Component({
  selector: "app-user-add-form",
  templateUrl: "user-add-form.component.html",
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormErrorComponent, JsonPipe],
})
export class UserAddFormComponent {
  public onSubmit = output<UserAddRequestModel>();
  public serverSideErrors = input<ErrorModel[]>();
  public ddlModel = new DdlModel();

  public constructor(
    private readonly _fb: FormBuilder,
    private readonly _dropdownService: DropdownService
  ) {
    this.form = this._fb.group({
      firstName: ["", Validators.required],
      lastName: [""],
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
      roleId: ["", Validators.required]
    },
      { validators: valueMatchValidator("password", "confirmPassword", "Password do not match") });
  }

  public async ngOnInit() {
    this.ddlModel = await this._dropdownService.get(`${Ddl.ROLE}`);
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

    const output = new UserAddRequestModel();
    output.firstName = this.form.get("firstName")?.value;
    output.lastName = this.form.get("lastName")?.value;
    output.username = this.form.get("username")?.value;
    output.email = this.form.get("email")?.value;
    output.password = this.form.get("password")?.value;
    output.roleId = this.form.get("roleId")?.value;

    this.onSubmit.emit(output);
  }
}
