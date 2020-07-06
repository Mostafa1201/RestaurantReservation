// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// Material
import { MatDialog } from '@angular/material';

// SlipCash
import { BaseRequestService } from './base-request.service';
// import { GlobalLoaderService } from '../frontend-services/global-loader.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class BaseGetRequestService extends BaseRequestService {
	constructor(
		private http: HttpClient,
		router: Router,
		// gls: GlobalLoaderService,
		authService: AuthService
	) {
		super(
			// gls,
			router,
			authService
		);
	}

	async _makeRequest() {
		const path = this.getPath();
		const headers = this.getHeaders();
		const params = this.getParams();

		try {
			// Makes a GET request to the provided `path` with the attached `headers` and `params`.
			const response = await this.http.get(path, { headers, params }).toPromise();
			this.setResponse(response);

			// After making the request, we will pre-process the response status to take an
			// action accordingly.
			return this.preProcessResponse(response);
		} catch (err) {
			return this.preProcessResponse(err);
		}
	}
}
