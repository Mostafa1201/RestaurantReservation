// Angular
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

// Material
import { MatDialog } from "@angular/material";

// SlipCash
import { BaseGetRequestService } from "./base-get-request.service";
// import { GlobalLoaderService } from "../frontend-services/global-loader.service";

@Injectable({
	providedIn: "root"
})
export class BaseLoggedInGetRequest extends BaseGetRequestService {
	_makeRequest(): Promise<any> {
		this._headers = new HttpHeaders({
			authorization: `${localStorage.getItem("token")}`
		});

		return super._makeRequest();
	}
}
