import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { ProjectAddFormComponent } from "app/project/components/project-add-form/project-add-form.component";
import { environment } from "config/environment";
import { ApiResponseModel } from "models/api-response.model";
import { firstValueFrom } from "rxjs";
import { LoaderService } from "services/loader.service";
import { SnackbarService } from "services/snackbar.service";

@Component({
    templateUrl: "project.page.html",
    imports: [MatButtonModule, MatIconModule]
})
export class ProjectPage {
    private readonly _urls = {
        add: environment.apiBaseUrl + "/api/v1/project"
    };

    public constructor(
        private readonly _dialog: MatDialog,
        private readonly _snackbarService: SnackbarService,
        private readonly _loaderService: LoaderService,
        private readonly _httpClient: HttpClient
    ) { }

    public async onAdd() {
        const dialog = this._dialog.open(ProjectAddFormComponent, {
            width: "900px"
        });

        const value = await firstValueFrom(dialog.afterClosed());

        if (value == null) {
            return;
        }

        try {
            this._loaderService.show();
            const response = await firstValueFrom(this._httpClient.post<ApiResponseModel<boolean>>(this._urls.add, value));

            if (response.data == null) {
                return;
            }

            this._snackbarService.showSuccess(response.message);
        }
        catch (errorResponse: any) {
            if (errorResponse.status == 0) {
                this._snackbarService.showError("Unexpected error occurred. Check console for more details");
                console.error(errorResponse);

                return;
            }
            else if (errorResponse.status == 500) {
                this._snackbarService.showError(errorResponse.error.errorMessage);
            }
        }
        finally {
            this._loaderService.hide();
        }
    }
}