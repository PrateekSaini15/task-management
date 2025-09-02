import { Injectable } from "@angular/core";
import { LocalStorageService } from "./local-storage.service";
import { BehaviorSubject, firstValueFrom, Observable } from "rxjs";
import { LoginRequestModel } from "app/login/models/login-request.model";
import { ErrorModel } from "models/error.model";
import { HttpClient } from "@angular/common/http";
import { ApiResponseModel } from "models/api-response.model";
import { LoginResponseModel } from "app/login/models/login-response.model";
import { JwtPayloadModel } from "models/jwt-payload.model";
import { environment } from "config/environment";
import { SnackbarService } from "./snackbar.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private readonly _urls = {
        login: environment.apiBaseUrl + "/api/v1/auth/login"
    };
    private authState$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    public constructor(
        private readonly _localStorageService: LocalStorageService,
        private readonly _httpClient: HttpClient,
        private readonly _snackbarService: SnackbarService,
        private readonly _router: Router
    ) { }

    get IsAuthenticated$(): Observable<boolean> {
      if (this.getToken() != null && this.authState$.value != true) {
        this.authState$.next(true);
      }
      else if (this.getToken() == null && this.authState$.value != false) {
        this.authState$.next(false);
      }

      return this.authState$.asObservable();
    }

    public isAuthenticated(): boolean {
      if (this.getToken() != null && this.authState$.value != true) {
        this.authState$.next(true);
      }
      else if (this.getToken() == null && this.authState$.value != false) {
        this.authState$.next(false);
      }

      return this.authState$.value;
    }

    private getToken(): JwtPayloadModel | null {
      try{
        const token = this._localStorageService.getToken();

        if (token == null) {
          return null
        }

        const payloadString = atob(token.split('.')[1]);

        if (payloadString == "") {
          return null;
        }

        const jwtPayload = JSON.parse(payloadString) as JwtPayloadModel;

        return jwtPayload;
      }
      catch(e) {
        return null;
      }
    }
}
