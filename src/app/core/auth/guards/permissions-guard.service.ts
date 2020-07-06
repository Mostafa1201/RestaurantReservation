import { Injectable } from '@angular/core';
import {
	Route,
	Router,
	CanActivate,
	ActivatedRoute,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuardService implements CanActivate {
	canActivate(): boolean {
		return true; // Debugging
	}
}
