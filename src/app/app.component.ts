import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
	CheckboxModel,
	ConfirmationComponent,
	IConfirmation,
	IconService,
	TableModel,
} from '@adl/angular-ui';
import { SAMPLE_FORM_CONST, TABLE_USER_CONST } from './app-config.const';
import { IconsList } from '../assets/svg/IconsList';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	public table: TableModel = TABLE_USER_CONST;
	public formValidator: any = SAMPLE_FORM_CONST;
	public isSubmit: boolean = false;

	constructor(
		private dialog: MatDialog,
		private iconService: IconService
	) {
		iconService.registerIcons(IconsList);
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
}
