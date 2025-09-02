import { Routes } from '@angular/router';
import { AuthGuard } from 'guards/auth.guard';

export const routes: Routes = [
    {
        path:"",
        redirectTo: "dashboard",
        pathMatch: "full"
    },
    {
        path: "login",
        loadChildren: () => import("./login/login.routes").then(i => i.LoginRoutes)
    },
    {
        path: "dashboard",
        loadChildren: () => import("./dashboard/dashboard.routes").then(i => i.DashboardRoutes),
        canActivate: [AuthGuard]
    }
];
