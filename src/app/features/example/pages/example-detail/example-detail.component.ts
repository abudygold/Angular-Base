import { AdlLibModule } from '@adlfe/angular-ui';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { CardUIComponent } from 'src/app/shared/components/card-ui';
import { HeadingUIComponent } from 'src/app/shared/components/heading-ui';

import { NotFoundComponent } from '../../../not-found';

@Component({
	standalone: true,
	imports: [
		AdlLibModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		MatFormFieldModule,
		MatInputModule,
		MatCardModule,
		NotFoundComponent,
		CardUIComponent,
		HeadingUIComponent,
	],
	selector: 'app-example-detail',
	templateUrl: './example-detail.component.html',
	styleUrl: './example-detail.component.scss',
})
export class ExampleDetailComponent {
	formControl: FormControl = new FormControl();
	value: string = '';

	constructor(private router: Router) {}

	navigateToList(): void {
		this.router.navigate(['/secure/example']);
	}
}
