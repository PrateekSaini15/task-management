import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { JwtPayloadModel } from 'models/jwt-payload.model';
import { LocalStorageService } from 'services/local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private readonly _localStorageService: LocalStorageService,
        private readonly _router: Router
    ) { }

    public canActivate(): boolean | UrlTree {
        const token = this._localStorageService.getToken();

        if (token != null && this.isTokenValid(token)) {
            return true;
        }

        this._localStorageService.removeToken();

        return this._router.parseUrl('/login');
    }

    private isTokenValid(token: string): boolean {
        try {
            let payloadString = atob(token.split('.')[1]);

            if (payloadString == "") {
                return false;
            }

            let jwtPayload = JSON.parse(payloadString) as JwtPayloadModel;

            const now = Math.floor(Date.now() / 1000);

            if (jwtPayload.exp <= now) {
                return false;
            }

            return true;
        } catch (e) {
            return false;
        }
    }
}
