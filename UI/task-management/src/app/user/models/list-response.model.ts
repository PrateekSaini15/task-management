export class ListResponseModel {
    public users: ListItemModel[] = [];
}

export class ListItemModel {
    public id: number = 0;

    public name: string = "";

    public role: string = "";
}