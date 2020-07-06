import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing-module';
import { MaterialModule } from './../../core/material/material.module';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
	declarations: [
		LoginComponent,
        RegisterComponent,
        AuthComponent,
	],
	imports: [
		CommonModule,
        ReactiveFormsModule,
		AuthRoutingModule,
		MaterialModule
	]
})
export class AuthModule {}
