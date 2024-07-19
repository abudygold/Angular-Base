import { Routes } from '@angular/router';

import { NotFoundComponent } from '../../features/not-found';
import { AuthGuard } from '../auth/guard';
import { LoginComponent } from '../auth/pages/login';
import { PasswordRecoveryComponent } from '../auth/pages/password-recovery';
import { RegisterComponent } from '../auth/pages/register';

export const ROUTES_CONST: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full',
	},
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'register',
		component: RegisterComponent,
		canDeactivate: [AuthGuard],
	},
	{
		path: 'password-recovery',
		component: PasswordRecoveryComponent,
	},
	{
		path: 'secure',
		loadChildren: () =>
			import('../layout/layout.routes').then((m) => m.LAYOUT_ROUTES_CONST),
	},
	{ path: '404', component: NotFoundComponent },
	{ path: '**', component: NotFoundComponent },
];
