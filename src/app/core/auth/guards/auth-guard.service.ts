import { Injectable } from "@angular/core";
import { Router, CanActivate, Route, ActivatedRoute } from "@angular/router";
import { AuthService } from "../auth.service";

@Injectable({
	providedIn: "root"
})
export class AuthGuardService implements CanActivate {
	constructor(private router: Router) {}
	canActivate(): boolean {
		if (localStorage.getItem("token")) {
			return true;
		}
		this.router.navigate(["/auth/login"]);
	}
}
