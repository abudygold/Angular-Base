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
} from '@adl/angular-ui';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

import { Subscription } from 'rxjs';

import { IconsList } from '../assets/svg/IconsList';
import {
	ACTIVE_ENUM,
	UNICORN_PATH_CONST,
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

		console.log(
			generateHttpParams({
				firstName: 'john',
				lastName: 'doe',
			}).toString()
		);

		this.getUnicornListService();
	}

	private getUnicornListService(): void {
		this.isLoading = true;

		const subs = this.baseService
			.getPagingData(UNICORN_PATH_CONST, CommentModel, this.unicornParam)
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
		const bodyReq = new CommentReqModel(
			'John Doe',
			'john-doe@example.com',
			'lorem ipsum'
		);

		const subs = this.baseService
			.postData(UNICORN_PATH_CONST, bodyReq)
			.subscribe(() => {
				// Write code here
			});

		this.subscribers.push(subs);
	}

	private updateUnicornService(): void {
		const bodyReq = new CommentReqModel(
			'John Doe',
			'john-doe@example.com',
			'lorem ipsum'
		);

		const subs = this.baseService
			.putData(UNICORN_PATH_CONST + '/:id', bodyReq)
			.subscribe(() => {
				// Write code here
			});

		this.subscribers.push(subs);
	}

	private deleteUnicornService(): void {
		const subs = this.baseService
			.deleteData(UNICORN_PATH_CONST + '/:id', null)
			.subscribe(() => {
				// Write code here
			});

		this.subscribers.push(subs);
	}

	onSearch(e: any): void {
		console.log(e);
	}

	onSave(): void {
		this.isSubmit = true;
		setTimeout(() => {
			this.isSubmit = false;
		}, 2000);
	}

	onChecked(e: CheckboxModel[]): void {
		console.log(e.filter((t: CheckboxModel) => t.checked));
	}

	onUpdatePage(page: PageEvent): void {
		this.table.page =
			this.table.pageSize === page?.pageSize ? page?.pageIndex + 1 : 1;
		this.table.pageSize = page?.pageSize;
		this.unicornParam.pageNo = this.table.page;
		this.unicornParam.pageSize = this.table.pageSize;
		this.getUnicornListService();
	}

	onActionClicked(e: { action: string; row: any }): void {
		console.log(e);
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
