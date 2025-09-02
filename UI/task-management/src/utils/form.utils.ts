import { FormGroup } from "@angular/forms";
import { ErrorModel } from "models/error.model";

export function setServerSideErrors(form: FormGroup, errors: ErrorModel[] = []): void {
    for (let controlName in form?.controls) {
        let currentErrors: string[] = [];

        for (var error of errors) {
            if (controlName == error.property) {
                let control = form?.controls[controlName];
                currentErrors.push(error.error);
                control.setErrors({ "server-side-error": currentErrors });
            }
        }
    }
}