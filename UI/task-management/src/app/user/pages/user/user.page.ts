import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserListComponent } from "app/user/components/user-list/user-list.component";
import { environment } from "config/environment";
import { HttpClient } from "@angular/common/http";
import { ListItemModel, ListResponseModel } from "app/user/models/list-response.model";
import { ApiResponseModel } from "models/api-response.model";
import { firstValueFrom } from "rxjs";
import { SnackbarService } from "services/snackbar.service";
import { LoaderService } from "services/loader.service";

@Component({
  templateUrl: "user.page.html",
  imports: [MatIconModule, MatButtonModule, MatTooltipModule, RouterLink, UserListComponent],
})
export class UserPage {
  private readonly _urls = {
    get: environment.apiBaseUrl + "/api/v1/user"
  };

  public constructor(
    private readonly _httpClient: HttpClient,
    private readonly _snackbarService: SnackbarService,
    private readonly _loaderService: LoaderService
  ){}

  public users: ListItemModel[] = [];

  public async ngOnInit() {
    try{
      this._loaderService.show();
      var response = await firstValueFrom(this._httpClient.get<ApiResponseModel<ListResponseModel>>(this._urls.get));

      if (response.data == null) {
        return;
      }

      this.users = response.data.users;
    }
    catch (errorResponse: any){
      if (errorResponse.status == 0) {
        this._snackbarService.showError("Unexpected error occurred. Check console for more details");
        console.error(errorResponse);

        return;
      }
      else if (errorResponse.status == 500) {
        this._snackbarService.showError(errorResponse.error.errorMessage);
      }
    }
    finally{
      this._loaderService.hide();
    }
  }
}
