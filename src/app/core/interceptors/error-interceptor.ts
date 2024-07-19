import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor() {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				let errorMsg = '';

				if (error.error instanceof ErrorEvent) {
					console.log('This is client side error');
					errorMsg = `Error: ${error.error.message}`;
				} else {
					console.log('This is server side error');
					errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
				}

				console.log(errorMsg);
				return throwError(errorMsg);
			})
		);
	}
}
