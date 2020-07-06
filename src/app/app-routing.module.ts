import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/auth/guards/auth-guard.service';


const routes: Routes = [
  {
		path: "auth",
		loadChildren: "./pages/auth/auth.module#AuthModule"
  },
  {
		path: "",
    loadChildren: "./themes.module#ThemesModule",
    canActivate: [AuthGuardService]
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
