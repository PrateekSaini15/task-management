import { ErrorModel } from "./error.model";

export class ApiResponseModel<T>{
    public data: T | undefined;
    public status: number = 0;
    public isSuccess: boolean = false;
    public message: string = "";
    public errorMessage: string = "";
    public errors: ErrorModel[] = [];
}