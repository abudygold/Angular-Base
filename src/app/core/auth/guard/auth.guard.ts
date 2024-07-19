import { Injectable } from '@angular/core';
import {
	CanActivate,
	CanActivateChild,
	CanDeactivate,
	CanLoad,
	Router,
} from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard
	implements CanActivate, CanActivateChild, CanDeactivate<any>, CanLoad
{
	constructor(private router: Router) {}

	canActivate(): boolean {
		return this.checkAuth();
	}

	canActivateChild(): boolean {
		return this.checkAuth();
	}

	canDeactivate(component: any): boolean {
		if (component.hasUnsavedChanges()) {
			return window.confirm(
				'You have unsaved changes. Do you really want to leave?'
			);
		}

		return true;
	}

	canLoad(): boolean {
		return this.checkAuth();
	}

	private checkAuth(): boolean {
		if (!!localStorage.getItem('accessToken')) {
			return true;
		} else {
			this.router.navigate(['/login']);
			return false;
		}
	}
}
