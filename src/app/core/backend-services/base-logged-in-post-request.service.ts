// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Material
import { MatDialog } from '@angular/material';

// SlipCash
import { BasePostRequestService } from './base-post-request.service';
// import { GlobalLoaderService } from '../frontend-services/global-loader.service';

@Injectable({
  providedIn: 'root'
})
export class BaseLoggedInPostRequest extends BasePostRequestService {
	_makeRequest(): Promise<any> {
		this._headers = new HttpHeaders({
			'authorization': `JWT ${localStorage.getItem('token')}`,
		});
		console.log("test: ",`JWT ${localStorage.getItem('token')}`);
		
		return super._makeRequest();
	}
}
