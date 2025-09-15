import { Component, input, SimpleChanges } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { ListItemModel } from "app/user/models/list-response.model";

@Component({
    selector: "app-user-list",
    templateUrl: "user-list.component.html",
    imports: [MatTableModule],
})
export class UserListComponent {
    public users = input<ListItemModel[]>();
    public dataSource = [];
    public displayedColumns: string[] = ["Name", "Role"];

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes["users"] != null) {
            this.dataSource = changes["users"].currentValue;
        }
    }
}