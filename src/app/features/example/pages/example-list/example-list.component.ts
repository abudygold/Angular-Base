import {
	AdlLibModule,
	BaseParamReqModel,
	BaseService,
	ConfirmationComponent,
	TableModel,
} from '@adlfe/angular-ui';
import {
	AfterViewInit,
	Component,
	OnDestroy,
	OnInit,
	ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { CardUIComponent } from '../../../../shared/components/card-ui';
import { HeadingUIComponent } from '../../../../shared/components/heading-ui';
import {
	CONFIRMATION_DELETE_CONST,
	EXAMPLE_SERVICE_PATH_CONST,
} from '../../../../shared/constant';
import { ExampleListFilterComponent } from '../../components/example-list-filter';
import { TABLE_USER_CONST } from '../../shared/constant';
import { ExampleModel } from '../../shared/model';

@Component({
	standalone: true,
	imports: [
		AdlLibModule,
		MatCardModule,
		MatProgressSpinnerModule,
		MatDialogModule,
		MatButtonModule,
		MatIconModule,
		CardUIComponent,
		HeadingUIComponent,
		ExampleListFilterComponent,
	],
	selector: 'app-example-list',
	templateUrl: './example-list.component.html',
	styleUrl: './example-list.component.scss',
	encapsulation: ViewEncapsulation.None,
})
export class ExampleListComponent implements OnInit, AfterViewInit, OnDestroy {
	table: TableModel = TABLE_USER_CONST;
	isLoading: boolean = false;
	filterOpened: boolean = false;
	filterValue: any = null;

	private unicornParam!: BaseParamReqModel;
	private subscribers: Subscription[] = [];

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private dialog: MatDialog,
		private baseService: BaseService,
		private toastr: ToastrService
	) {}

	ngOnInit(): void {
		this.unicornParam = new BaseParamReqModel();
		this.getUnicornListService();

		setTimeout(() => this.removeFilterContainer());
	}

	ngAfterViewInit(): void {
		window.addEventListener('change', (e) => {
			if ((e.target as HTMLInputElement).id !== 'pagination__change') return;

			const page = +(e.target as HTMLInputElement).value;

			if (page !== this.unicornParam.pageNo) {
				this.unicornParam.pageNo = page;
				this.table.page = page;
				this.getUnicornListService();
				localStorage.setItem('isFirstRenderPagination', 'false');
			}
		});
	}

	private getUnicornListService(): void {
		this.isLoading = true;

		const subs = this.baseService
			.getPagingData(
				EXAMPLE_SERVICE_PATH_CONST,
				ExampleModel,
				this.unicornParam
			)
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

	private deleteUnicornService(): void {
		const subs = this.baseService
			.deleteData(EXAMPLE_SERVICE_PATH_CONST + '/:id', null)
			.subscribe(() => {
				this.toastr.success('Comment has been added successfully');
			});

		this.subscribers.push(subs);
	}

	onSearch(txtInput: any): void {
		this.unicornParam.filter = txtInput;
		this.getUnicornListService();
	}

	onUpdatePage(page: PageEvent): void {
		this.table.page =
			this.table.pageSize === page?.pageSize ? page?.pageIndex + 1 : 1;
		this.table.pageSize = page?.pageSize;
		this.unicornParam.pageNo = this.table.page;
		this.unicornParam.pageSize = this.table.pageSize;

		localStorage.setItem('isFirstRenderPagination', 'false');
		this.getUnicornListService();
	}

	onActionClicked(event: { action: string; row: any }): void {
		if (event.action === 'delete') this.openDialog();
		else if (event.action === 'preview')
			this.router.navigate(['detail/', event.row.id], {
				relativeTo: this.activatedRoute,
			});
		else if (event.action === 'edit')
			this.router.navigate(['update/', event.row.id], {
				relativeTo: this.activatedRoute,
			});
	}

	openDialog(length: number = 1): void {
		const confirmation = CONFIRMATION_DELETE_CONST(length, 'Agent');
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

			this.deleteUnicornService();
		});
	}

	filterClickHandler(): void {
		this.router.navigate([], {
			relativeTo: this.activatedRoute,
			queryParams: {
				opened: true,
			},
		});

		setTimeout(() => {
			const sourceDiv = document.getElementById('list-filter');
			const destinationDiv = document.getElementById('filter-ui');

			// Using a while loop to move elements to the destination div
			while (sourceDiv?.firstElementChild) {
				destinationDiv
					?.getElementsByClassName('mat-drawer-inner-container')[0]
					.appendChild(sourceDiv.firstElementChild);
			}

			sourceDiv!.style.display = 'block';
		});
	}

	filterUpdateHandler(filterValue: any): void {
		this.filterValue = filterValue;
		this.filterOpened = false;

		this.getUnicornListService();
		this.removeFilterContainer();
	}

	filterCloseHandler(): void {
		const params = { ...this.activatedRoute.snapshot.queryParams };
		delete params['opened'];

		this.removeFilterContainer();

		this.filterOpened = false;
		this.router.navigate([], { queryParams: params });
	}

	private removeFilterContainer(): void {
		document
			.getElementById('filter-ui')!
			.getElementsByClassName('mat-drawer-inner-container')[0]!.innerHTML = '';
	}

	navigateToCreatePage(): void {
		this.router.navigate(['create'], {
			relativeTo: this.activatedRoute,
		});
	}

	ngOnDestroy(): void {
		this.subscribers.forEach((each) => each.unsubscribe());
	}
}
