import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  templateUrl: "user.page.html",
  imports: [MatIconModule, MatButtonModule, MatTooltipModule, RouterLink],
})
export class UserPage {



}
