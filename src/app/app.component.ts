import { IconService } from '@adlfe/angular-ui';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { IconsList } from '../assets/icon-list/IconsList';

@Component({
	standalone: true,
	selector: 'app-root',
	imports: [CommonModule, RouterOutlet],
	template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
	constructor(private iconService: IconService) {
		iconService.registerIcons(IconsList);
	}
}
