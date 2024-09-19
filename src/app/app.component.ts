import { IconService } from '@adlfe/angular-ui';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

import { IconsList } from '../assets/icon-list/IconsList';
import { APP_TITLE } from './shared/constant';

@Component({
	standalone: true,
	selector: 'app-root',
	imports: [RouterOutlet],
	template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
	constructor(
		private iconService: IconService,
		private title: Title
	) {
		iconService.registerIcons(IconsList);
		title.setTitle(APP_TITLE);
	}
}
