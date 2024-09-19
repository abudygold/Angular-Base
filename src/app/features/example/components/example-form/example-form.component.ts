import { AdlLibModule } from '@adlfe/angular-ui';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { CardUIComponent } from '../../../../shared/components/card-ui';
import { HeadingUIComponent } from '../../../../shared/components/heading-ui';
import { SAMPLE_FORM_CONST } from '../../shared/constant';
import { ExampleModel } from '../../shared/model';

@Component({
	standalone: true,
	imports: [
		AdlLibModule,
		FormsModule,
		ReactiveFormsModule,
		MatCardModule,
		MatButtonModule,
		CardUIComponent,
		HeadingUIComponent,
	],
	selector: 'app-example-form',
	templateUrl: './example-form.component.html',
	styleUrl: './example-form.component.scss',
})
export class ExampleFormComponent implements OnInit {
	@Output()
	formValue: EventEmitter<any> = new EventEmitter();

	form!: FormGroup;
	isSubmit: boolean = false;
	formValidator: any = SAMPLE_FORM_CONST;

	@Input()
	selectedData: ExampleModel | undefined;

	constructor(
		private router: Router,
		private toastr: ToastrService
	) {}

	ngOnInit(): void {
		this.initForm();
	}

	private initForm(): void {
		this.form = new FormGroup({
			id: new FormControl(this.selectedData?.id ?? ''),
			name: new FormControl(this.selectedData?.name ?? '', Validators.required),
			email: new FormControl(this.selectedData?.email ?? '', [
				Validators.required,
				Validators.email,
			]),
			body: new FormControl(this.selectedData?.body ?? '', [
				Validators.required,
				Validators.maxLength(250),
			]),
		});
	}

	setValueField(value: any, control: string): void {
		this.form.get(control)?.setValue(value);
	}

	onSave(): void {
		this.form.markAllAsTouched();
		this.isSubmit = true;

		if (!this.form.valid) {
			setTimeout(() => (this.isSubmit = false));
			this.toastr.error('Please complete the form below and click Submit.');
			return;
		}

		this.formValue.emit(this.form.getRawValue());
	}

	onCancel(): void {
		this.router.navigate(['/secure/example']);
	}
}
