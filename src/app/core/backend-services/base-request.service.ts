// Angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// SlipCash
// import { LoaderComponent } from '../frontend-services/loader-component/loader.component';
// import { GlobalLoaderService } from '../frontend-services/global-loader.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
	providedIn: 'root'
})
export abstract class BaseRequestService {
	//
	// API Endpoint
	//
	_path: string;

	//
	// Request Parameters
	//
	_params: {};

	//
	// Request Headers
	//
	_headers: {};

	//
	// The returned response. Used for pre/post-processing as in
	// `preProcessResponse` and `processResponse`.
	//
	_response: any;

	// private _isLoading = new Subject<boolean>();
	private hasLoader: boolean = true;
	private emiterPaused: boolean = false;

	/**
	 * @constructor
	 */
	constructor(
		// private gls: GlobalLoaderService,
		private router: Router,
		private authService: AuthService
	) {}

	/**
	 * Getters
	 */
	getPath() {
		return this._path;
	}

	getParams() {
		return this._params;
	}

	getHeaders() {
		return this._headers;
	}

	getResponse() {
		return this._response;
	}

	/**
	 * Setters
	 */
	setPath(path) {
		this._path = path;
	}

	setParams(params) {
		this._params = params;
	}

	setHeaders(headers) {
		this._headers = headers;
	}

	setResponse(response) {
		this._response = response;
	}

	/**
	 * This method can be overriden to pass the given response into some
	 * filtering. It currently returns the response, but it will be overriden
	 * by other classes/services.
	 *
	 * @return Returns the passed response.
	 */
	processResponse(response) {
		return response;
	}

	/**
	 * Acts as a filter pipe for the incoming response status and takes
	 * an action accordingly.
	 */
	preProcessResponse(response) {
	    switch (response.status) {
			case 400:
				throw { faultyRequest: response };
	      	case 404:
	        	this.router.navigate(['/404']);
				break;
	      	case 410:
	      		this.authService.logout();
				break;
			case 403:
				break;
			case 460:
				throw { validationErrors: response };
			case 500:
			case 501:
			case 502:
			case 503:
			case 504:
				break;
			default:
				break;
	    }

	    return this.processResponse(response);
	}

	/**
	 * Attempts to call the `_makeRequest()` method that is implemented
	 * by other classes.
	 *
	 * @return Promise
	 */
	async makeRequest(load = null): Promise<any> {
		// if (this.hasLoader && !load) {
		// 	this.gls.open();
		// }

		// if (!this.emiterPaused) {
		// 	this._isLoading.next(true);
		// }

		let res, rej;

		try {
			// --- * --- * ---
			// Here it goes!
			// --- * --- * ---
			res = await this._makeRequest();
		} catch (err) {
			rej = err;
		}

		// if (this.hasLoader) {
		// 	this.gls.close();
		// }

		// if (!this.emiterPaused) {
		// 	this._isLoading.next(false);
		// }

		if (res) {
			return Promise.resolve(res);
		}

		if (rej) {
			return Promise.reject(rej);
		}
	}

	/**
	 * An abstract method that will handle the actual request making process.
	 *
	 * @return Promise
	 */
	abstract async _makeRequest(): Promise<any>;

	// pauseLoadingEventEmitter() {
	// 	this.emiterPaused = true;
	// }

	// unpauseLoadingEventEmitter() {
	// 	this.emiterPaused = false;
	// }

	// deactivateLoader() {
	// 	this.hasLoader = false;
	// }

	// activateLoader() {
	// 	this.hasLoader = true;
	// }

	// loader() {
	// 	return this._isLoading;
	// }
}
