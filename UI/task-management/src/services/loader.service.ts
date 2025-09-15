import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class LoaderService {
    public IsLoading: Subject<boolean>;

    public constructor() {
        this.IsLoading = new Subject<boolean>();
    }

    public show() {
        setTimeout(() => this.IsLoading.next(true), 1);
    }

    public hide() {
        setTimeout(() => this.IsLoading.next(false), 1);
    }
}