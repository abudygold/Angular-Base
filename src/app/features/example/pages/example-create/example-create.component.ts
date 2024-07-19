import { BaseService } from '@adlfe/angular-ui';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { EXAMPLE_SERVICE_PATH_CONST } from '../../../../shared/constant';
import { ExampleFormComponent } from '../../components/example-form';
import { ExampleReqModel } from '../../shared/model';

@Component({
	standalone: true,
	imports: [ExampleFormComponent],
	selector: 'app-example-create',
	templateUrl: './example-create.component.html',
	styleUrl: './example-create.component.scss',
})
export class ExampleCreateComponent {
	private unsavedChanges: boolean = true;
	private subscribers: Subscription[] = [];

	constructor(
		private router: Router,
		private baseService: BaseService
	) {}

	onSave(formValue: any): void {
		const bodyReq = new ExampleReqModel(formValue);

		const subs = this.baseService
			.postData(EXAMPLE_SERVICE_PATH_CONST, bodyReq)
			.subscribe({
				next: (resp) => {
					console.log(resp);
					this.unsavedChanges = false;
					this.router.navigate(['/secure/example']);
				},
				error: (err) => {
					console.log(err);
					this.unsavedChanges = false;
				},
			});

		this.subscribers.push(subs);
	}

	hasUnsavedChanges(): boolean {
		return this.unsavedChanges;
	}
}
