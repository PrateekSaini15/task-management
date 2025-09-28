import { Component } from "@angular/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-sidenav",
    templateUrl: "sidenav.component.html",
    styleUrl: "sidenav.component.scss",
    imports: [MatListModule, MatIconModule, RouterLink, MatExpansionModule]
})
export class SidenavComponent {

}