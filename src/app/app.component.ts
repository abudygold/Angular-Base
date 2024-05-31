import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
	BaseService,
	CheckboxModel,
	ConfirmationComponent,
	IConfirmation,
	IconService,
	TableModel,
} from '@adl/angular-ui';
import {
	RESOURCE_PATH_CONST,
	SAMPLE_FORM_CONST,
	TABLE_USER_CONST,
} from './app-config.const';
import { IconsList } from '../assets/svg/IconsList';
import { Subscription } from 'rxjs';
import { ResourceModel } from './shared/model';
import { ResourceReqModel } from './shared/model/resouce-req.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
	public table: TableModel = TABLE_USER_CONST;
	public formValidator: any = SAMPLE_FORM_CONST;
	public isSubmit: boolean = false;

	private subscribers: Subscription[] = [];

	constructor(
		private dialog: MatDialog,
		private iconService: IconService,
		private baseService: BaseService
	) {
		iconService.registerIcons(IconsList);
	}

	ngOnInit(): void {
		this.getResourceListService();
	}

	private getResourceListService(): void {
		const subs = this.baseService
			.getPagingData(RESOURCE_PATH_CONST + '/unicorns', ResourceModel)
			.subscribe((resp) => {
				this.table.dataSource = resp?.data ?? null;
			});

		this.subscribers.push(subs);
	}

	private createResourceService(): void {
		const bodyReq = new ResourceReqModel('Test', 10, 'blue');

		const subs = this.baseService
			.postData(RESOURCE_PATH_CONST + '/unicorns', bodyReq)
			.subscribe(() => {
				// Write code here
			});

		this.subscribers.push(subs);
	}

	private updateResourceService(): void {
		const bodyReq = new ResourceReqModel('Update Test', 15, 'green');

		const subs = this.baseService
			.putData(
				RESOURCE_PATH_CONST + '/unicorns/6659974519f3e403e81e18a6',
				bodyReq
			)
			.subscribe(() => {
				// Write code here
				this.getResourceListService();
			});

		this.subscribers.push(subs);
	}

	private deleteResourceService(): void {
		const subs = this.baseService
			.deleteData(
				RESOURCE_PATH_CONST + '/unicorns/6659974519f3e403e81e18a6',
				null
			)
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
			this.updateResourceService();
			// this.deleteResourceService();
			this.isSubmit = false;
		}, 2000);
	}

	onChecked(e: CheckboxModel[]): void {
		console.log(e.filter((t: CheckboxModel) => t.checked));
	}

	public openDialog(): void {
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
