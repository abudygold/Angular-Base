import {
	BaseOptionModel,
	BaseParamReqModel,
	BaseService,
	CheckboxModel,
	ConfirmationComponent,
	IConfirmation,
	IconService,
	TableModel,
	generateEnumOption,
	generateHttpParams,
} from '@adlfe/angular-ui';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

import { Subscription } from 'rxjs';

import { IconsList } from '../assets/svg/IconsList';
import {
	ACTIVE_ENUM,
	COMMENT_PATH_CONST,
	SAMPLE_FORM_CONST,
	TABLE_USER_CONST,
} from './app-config.const';
import { CommentModel, CommentReqModel } from './shared/model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
	public table: TableModel = TABLE_USER_CONST;
	public formValidator: any = SAMPLE_FORM_CONST;
	public isSubmit: boolean = false;
	public formControl: FormControl = new FormControl();
	public value: string = '';
	public activeOption: BaseOptionModel[] = [];
	public isLoading: boolean = false;
	public form!: FormGroup;

	private unicornParam!: BaseParamReqModel;
	private subscribers: Subscription[] = [];

	constructor(
		private dialog: MatDialog,
		private iconService: IconService,
		private baseService: BaseService
	) {
		iconService.registerIcons(IconsList);
	}

	ngOnInit(): void {
		this.activeOption = generateEnumOption(ACTIVE_ENUM);
		this.unicornParam = new BaseParamReqModel();

		/* Output: firstName=john&lastName=doe */
		console.log(
			generateHttpParams({
				firstName: 'john',
				lastName: 'doe',
			}).toString()
		);

		this.initForm();
		this.getUnicornListService();
	}

	private initForm(): void {
		this.form = new FormGroup({
			fullName: new FormControl(null, Validators.required),
			email: new FormControl(null, [Validators.required, Validators.email]),
			body: new FormControl(null, Validators.required),
			gender: new FormControl(null, Validators.required),
			genderRadio: new FormControl(null, Validators.required),
			hobby: new FormControl(null, Validators.required),
		});
	}

	private getUnicornListService(): void {
		this.isLoading = true;

		const subs = this.baseService
			.getPagingData(COMMENT_PATH_CONST, CommentModel, this.unicornParam)
			.subscribe({
				next: (resp) => {
					const start =
						this.table.pageSize * this.table.page - this.table.pageSize;
					const end = this.table.pageSize * this.table.page;

					this.table.dataSource = resp?.data?.slice(start, end) ?? null;
					this.table.totalData = resp?.data?.length;
					this.isLoading = false;
				},
				error: () => (this.isLoading = false),
			});

		this.subscribers.push(subs);
	}

	private createUnicornService(): void {
		const bodyReq = new CommentReqModel(this.form.getRawValue());

		const subs = this.baseService
			.postData(COMMENT_PATH_CONST, bodyReq)
			.subscribe({
				next: () => (this.isSubmit = false),
				error: () => (this.isSubmit = false),
			});

		this.subscribers.push(subs);
	}

	private updateUnicornService(): void {
		const bodyReq = new CommentReqModel(this.form.getRawValue());

		const subs = this.baseService
			.putData(COMMENT_PATH_CONST + '/:id', bodyReq)
			.subscribe({
				next: () => (this.isSubmit = false),
				error: () => (this.isSubmit = false),
			});

		this.subscribers.push(subs);
	}

	private deleteUnicornService(): void {
		const subs = this.baseService
			.deleteData(COMMENT_PATH_CONST + '/:id', null)
			.subscribe(() => {
				// Write code here
			});

		this.subscribers.push(subs);
	}

	onSearch(txtInput: any): void {
		console.log(txtInput);
	}

	setValueField(value: any, control: string): void {
		console.log('-- setValueField --', value);
		this.form.get(control)?.setValue(value);
	}

	setValueChecked(options: CheckboxModel[], control: string): void {
		console.log(
			'-- setValueChecked --',
			options.filter((t: CheckboxModel) => t.checked)
		);
		this.form
			.get(control)
			?.setValue(options.filter((t: CheckboxModel) => t.checked));
	}

	onSave(): void {
		this.form.markAllAsTouched();
		this.isSubmit = true;

		if (!this.form.valid) {
			setTimeout(() => (this.isSubmit = false));
			return;
		}

		this.createUnicornService();
	}

	onUpdatePage(page: PageEvent): void {
		this.table.page =
			this.table.pageSize === page?.pageSize ? page?.pageIndex + 1 : 1;
		this.table.pageSize = page?.pageSize;
		this.unicornParam.pageNo = this.table.page;
		this.unicornParam.pageSize = this.table.pageSize;
		this.getUnicornListService();
	}

	onActionClicked(event: { action: string; row: any }): void {
		if (event.action === 'delete') this.deleteUnicornService();
		else if (event.action === 'preview')
			console.log('Write code here for preview data');
		else if (event.action === 'edit')
			console.log(
				'Redirect to the edit form page or open the edit form dialog'
			);
	}

	openDialog(): void {
		const confirmation: IConfirmation = {
			title: 'Test',
			content:
				"<p>I've updated my project to Angular 16. In <code>app.module.ts</code>, I have an array of components named <code>entryComponents</code>. However, the <code>entryComponents</code> is no longer available in Angular 16. Where should I add these components to my project:</p>",
			submitBtn: 'Simpan',
			cancelBtn: 'Batal',
		};

		const _dialog = this.dialog.open(ConfirmationComponent, {
			width: '500px',
			autoFocus: false,
			data: {
				options: confirmation,
			},
		});

		_dialog.componentInstance.options = confirmation;
		_dialog.afterClosed().subscribe((resp) => {
			if (!resp) return;

			console.log(resp);
		});
	}

	ngOnDestroy(): void {
		this.subscribers.forEach((each) => each.unsubscribe());
	}
}
