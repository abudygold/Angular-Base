import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { APP_TITLE } from 'src/app/shared/constant';

@Component({
	standalone: true,
	selector: 'app-toolbar',
	imports: [NgClass, MatToolbarModule, MatMenuModule, MatIconModule],
	templateUrl: './toolbar.component.html',
	styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
	@Output() toggleHandler: EventEmitter<void> = new EventEmitter();

	appTitle: string = APP_TITLE;
	openSetting: boolean = false;

	@Input({
		required: true,
	})
	toggleConfig!: {
		isVisible: boolean;
		isMobile: boolean;
	};
}
