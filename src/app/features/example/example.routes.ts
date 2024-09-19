import { Routes } from '@angular/router';

import { AuthGuard } from '../../core/auth/guard';
import {
	COMMENT_MANAGEMENT_CONST,
	COMMENT_MANAGEMENT_CREATE_CONST,
	COMMENT_MANAGEMENT_DETAIL_CONST,
	COMMENT_MANAGEMENT_UPDATE_CONST,
} from '../../shared/constant/breadcrumb';
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
				data: {
					breadcrumb: COMMENT_MANAGEMENT_CONST,
				},
			},
			{
				path: 'create',
				component: ExampleCreateComponent,
				canDeactivate: [AuthGuard],
				data: {
					breadcrumb: COMMENT_MANAGEMENT_CREATE_CONST,
				},
			},
			{
				path: 'update/:id',
				component: ExampleUpdateComponent,
				canDeactivate: [AuthGuard],
				data: {
					breadcrumb: COMMENT_MANAGEMENT_UPDATE_CONST,
				},
			},
			{
				path: 'detail/:id',
				component: ExampleDetailComponent,
				data: {
					breadcrumb: COMMENT_MANAGEMENT_DETAIL_CONST,
				},
			},
		],
	},
];
