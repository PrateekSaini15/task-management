import { Component } from "@angular/core";
import { LoginFormComponent } from "../components/login-form/login-form.component";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { LoginResponseModel } from "../models/login-response.model";
import { ApiResponseModel } from "models/api-response.model";
import { environment } from "config/environment";
import { Router } from "@angular/router";
import { ErrorModel } from "models/error.model";
import { SnackbarService } from "services/snackbar.service";

@Component({
    imports: [LoginFormComponent],
    template: `
        <app-login-form [serverSideErrors]="errors" (onSubmit)="onSubmit($event);"></app-login-form>
    `
})
export class LoginPage {
    private readonly _urls = {
        login: environment.apiBaseUrl + "/api/v1/auth/login"
    };

    public constructor(
        private readonly _httpClient: HttpClient,
        private readonly _router: Router,
        private readonly _snackbarService: SnackbarService
    ) { }

    public errors: ErrorModel[] = [];

    public async onSubmit(model: any) {
        try {
            var response = await firstValueFrom(this._httpClient.post<ApiResponseModel<LoginResponseModel>>(this._urls.login, model));

            if (response.data == null || response.data.token == "") {
                return;
            }

            localStorage.setItem("token", response.data.token);
            this._snackbarService.showSuccess("Welcome");
            this._router.navigate(["/"]);
        }
        catch (errorResponse: any) {
            console.log(errorResponse);
            if (errorResponse.status == 0) {
                this._snackbarService.showError("Unexpected error occurred. Check console for more details");
                console.error(errorResponse);

                return;
            }

            if (errorResponse.error.errors.length > 0) {
                this.errors = errorResponse.error.errors;
            }
        }

    }
}