import { Routes } from '@angular/router';

import { AuthGuard } from '../../core/auth/guard';
import { ExampleCreateComponent } from './pages/example-create';
import { ExampleDetailComponent } from './pages/example-detail';
import { ExampleListComponent } from './pages/example-list';
import { ExampleUpdateComponent } from './pages/example-update';

export const LAYOUT_ROUTES_CONST: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: ExampleListComponent,
			},
			{
				path: 'create',
				component: ExampleCreateComponent,
				canDeactivate: [AuthGuard],
			},
			{
				path: 'update/:id',
				component: ExampleUpdateComponent,
				canDeactivate: [AuthGuard],
			},
			{
				path: 'detail/:id',
				component: ExampleDetailComponent,
			},
		],
	},
];
