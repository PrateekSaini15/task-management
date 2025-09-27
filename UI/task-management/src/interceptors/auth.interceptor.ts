import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { LocalStorageService } from "services/local-storage.service";

export function authInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

    const token = inject(LocalStorageService).getToken();

    if (token != null) {
        const newRequest = request.clone({
            headers: request.headers.append("Authorization", `Bearer ${token}`)
        });

        return next(newRequest);
    }

    return next(request);
}