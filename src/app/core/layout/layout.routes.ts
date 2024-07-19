import { Routes } from '@angular/router';

import { AuthGuard } from '../auth/guard';
import { MainLayoutComponent } from './main-layout';

export const LAYOUT_ROUTES_CONST: Routes = [
	{
		path: '',
		component: MainLayoutComponent,
		children: [
			{
				path: '',
				redirectTo: 'example',
				pathMatch: 'full',
			},
			{
				path: 'example',
				canActivate: [AuthGuard],
				loadChildren: () =>
					import('../../features/example/example.routes').then(
						(m) => m.LAYOUT_ROUTES_CONST
					),
			},
		],
	},
];
