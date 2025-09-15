import { AsyncPipe, CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Subject } from "rxjs";
import { LoaderService } from "services/loader.service";

@Component({
    selector: "app-loader",
    templateUrl: "loader.component.html",
    styleUrl: "loader.component.scss",
    imports: [CommonModule, AsyncPipe]
})
export class LoaderComponent {
    public isLoading: Subject<boolean>;

    public constructor(
        private readonly _loaderService: LoaderService
    ){
        this.isLoading = this._loaderService.IsLoading;
    }
}