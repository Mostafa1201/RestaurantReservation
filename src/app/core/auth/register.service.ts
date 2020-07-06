import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { BasePostRequestService } from "../backend-services/base-post-request.service";
import { AuthService } from "./auth.service";
import URL from "../constants/urls";

import * as jwt_decode from "jwt-decode";

function getDecodedAccessToken(token: string): any {
	try {
		return jwt_decode(token);
	} catch (Error) {
		return null;
	}
}

@Injectable({
	providedIn: "root"
})
export class RegisterService extends BasePostRequestService {
	_path = URL.auth.register;

	constructor(
		http: HttpClient,
		router: Router,
		private auth: AuthService
	) {
		super(http, router,auth);
	}

	/**
	 * Process the response after making the request.
	 *
	 * @check AuthService
	 */
	processResponse(response) {
		console.log(response);
		const tokenPayload = getDecodedAccessToken(response.token);
		this.auth.login(response.token, response.user , response.role , response.actions,response.user);
		return response;
	}
}
