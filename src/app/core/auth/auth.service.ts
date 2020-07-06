import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	token: string;
	role: any;
	loggedIn: boolean = false;

	/**
	 *
	 */
	constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

	/**
	 * Getters
	 */
	getToken() {
		//
		// Check the `token` property first, if it is set, return it. Else,
		// we will get it from the `localStorage` and update the `token` property.
		//
		if (this.token) {
			return this.token;
		} else {
			this.token = JSON.parse(localStorage.getItem('token'));
			return this.token;
		}
	}

	getRole() {
		//
		// Check the `role` property first, if it is set, return it. Else,
		// we will get it from the `localStorage` and update the `role` property.
		//
		if (this.role) {
			return this.role;
		} else {
			this.role = JSON.parse(localStorage.getItem('role'));
			return this.role;
		}
	}

	/**
	 * Setters
	 */
	setToken(token) {
		// Save in the `localStorage` and update the class property.
		localStorage.setItem('token', JSON.stringify(token));
		this.token = token;
	}

	setRole(role) {
		// Save in the `localStorage` and update the class property.
		localStorage.setItem('role', JSON.stringify(role));
		this.role = role;
	}

	/**
	 * Logs the user in.
	 *
	 * @return void
	 */
	login(token, roleId , role , actions,user) {
		localStorage.setItem('token',token);
		localStorage.setItem('roleId',JSON.stringify(roleId));
		localStorage.setItem('role',JSON.stringify(role));
		localStorage.setItem('actions',JSON.stringify(actions));
		localStorage.setItem('user',JSON.stringify(user));

		// this.router.navigateByUrl('/');
	}

	/**
	 * Logs the user out.
	 *
	 * @return void
	 */
	logout() {
		this.token = '';
		this.role = '';
		this.loggedIn = false;

		localStorage.clear();
		sessionStorage.clear();

		this.router.navigate(['/']);
	}

	/**
	 * Determines whether the user is authenticated or not by checking
	 * the `token` and making sure that it exists.
	 *
	 * @return boolean
	 */
	isAuthenticated(): boolean {
		return this.getToken() ? true : false;
	}
}
