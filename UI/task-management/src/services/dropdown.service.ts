import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "config/environment";
import { ApiResponseModel } from "models/api-response.model";
import { DdlModel } from "models/ddl.model";
import { firstValueFrom } from "rxjs";

@Injectable({providedIn: "root"})
export class DropdownService {
    private readonly _urls = {
        get: environment.apiBaseUrl + "/api/v1/dropdown"
    };

    public constructor(private readonly _httpClient: HttpClient){}

    public async get(keys: string): Promise<DdlModel> {
        let httpParams = new HttpParams().append("keys", keys);

        var response = await firstValueFrom(this._httpClient.get<ApiResponseModel<DdlModel>>(this._urls.get, {params: httpParams}));

        if (response.data == undefined || response.isSuccess == false){
            return new DdlModel();
        }

        return response.data;
    }
}