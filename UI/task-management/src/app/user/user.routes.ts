import { Routes } from "@angular/router";
import { UserPage } from "./pages/user/user.page";
import { UserAddUpdatePage } from "./pages/user-add-update/user-add-update.page";

export const UserRoutes: Routes = [
  {
    path: "",
    component: UserPage
  },
  {
    path: "add",
    component: UserAddUpdatePage
  }
];
