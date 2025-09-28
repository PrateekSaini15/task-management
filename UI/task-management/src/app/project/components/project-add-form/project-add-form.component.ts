import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { ProjectAddRequestModel } from "app/project/models/project-add-request.model";
import { ReactiveFormErrorComponent } from "app/shared/reactive-form-error/reactive-form-error.component";

@Component({
    templateUrl: "project-add-form.component.html",
    imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatDialogModule, MatInputModule, MatIconModule, ReactiveFormErrorComponent]
})
export class ProjectAddFormComponent {
    public constructor(
        private readonly _fb: FormBuilder,
        private readonly _dialogRef: MatDialogRef<ProjectAddFormComponent>
    ){
        this.form = this._fb.group({
            "name": ["", Validators.required]
        });
    }

    public form: FormGroup

    public onClose() {
        this._dialogRef.close(null);
    }

    public onSubmit() {
        this.form.markAllAsTouched();

        if (this.form.valid == false){
            return;
        }

        const output =new ProjectAddRequestModel();
        output.name = this.form.get("name")?.value;

        this._dialogRef.close(output);
    }
}