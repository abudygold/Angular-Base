import { BaseService } from '@adlfe/angular-ui';
import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { EXAMPLE_SERVICE_PATH_CONST } from '../../../../shared/constant';
import { ExampleFormComponent } from '../../components/example-form';
import { ExampleModel, ExampleReqModel } from '../../shared/model';

@Component({
	standalone: true,
	imports: [MatProgressSpinnerModule, ExampleFormComponent],
	selector: 'app-example-update',
	templateUrl: './example-update.component.html',
	styleUrl: './example-update.component.scss',
})
export class ExampleUpdateComponent {
	selectedData!: ExampleModel;
	isLoading: boolean = false;

	private unsavedChanges: boolean = true;
	private subscribers: Subscription[] = [];

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private baseService: BaseService
	) {
		this.getDetailService();
	}

	getDetailService(): void {
		this.isLoading = true;

		const subs = this.baseService
			.getData(
				EXAMPLE_SERVICE_PATH_CONST +
					'/' +
					this.activatedRoute.snapshot.params['id'],
				ExampleModel
			)
			.subscribe({
				next: (resp) => {
					this.selectedData = resp;
					this.isLoading = false;
				},
				error: () => (this.isLoading = false),
			});

		this.subscribers.push(subs);
	}

	onSave(formValue: any): void {
		const bodyReq = new ExampleReqModel(formValue);

		const subs = this.baseService
			.putData(
				EXAMPLE_SERVICE_PATH_CONST +
					'/' +
					this.activatedRoute.snapshot.params['id'],
				bodyReq
			)
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
