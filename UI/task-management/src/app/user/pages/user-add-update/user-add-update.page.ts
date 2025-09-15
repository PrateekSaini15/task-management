import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserAddFormComponent } from "app/user/components/user-add-form/user-add-form.component";
import { SnackbarService } from "services/snackbar.service";
import { ErrorModel } from "models/error.model";
import { environment } from "config/environment";
import { firstValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ApiResponseModel } from "models/api-response.model";

@Component({
  templateUrl: "user-add-update.page.html",
  imports: [MatIconModule, MatButtonModule, MatTooltipModule, RouterLink, UserAddFormComponent],
})
export class UserAddUpdatePage {
  private readonly _urls = {
    add: environment.apiBaseUrl + "/api/v1/user"
  };
  public constructor(
    private readonly _httpClient: HttpClient,
    private readonly _router: Router,
    private readonly _snackbarService: SnackbarService
  ) { }

  public errors: ErrorModel[] = [];

  public async onSubmit(model: any) {
    try {
      var response = await firstValueFrom(this._httpClient.post<ApiResponseModel<boolean>>(this._urls.add, model));

      if (response.data == null) {
        return;
      }

      this._snackbarService.showSuccess(response.message);
      this._router.navigate(["/user"]);
    }
    catch (errorResponse: any) {
      console.log(errorResponse);
      if (errorResponse.status == 0) {
        this._snackbarService.showError("Unexpected error occurred. Check console for more details");
        console.error(errorResponse);

        return;
      }
      else if (errorResponse.status == 500) {
        this._snackbarService.showError(errorResponse.error.errorMessage);
      }

      if (errorResponse.error.errors.length > 0) {
        this.errors = errorResponse.error.errors;
      }
    }
  }
}
