import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

@Component({
	standalone: true,
	selector: 'app-sidenav',
	imports: [
		NgForOf,
		RouterModule,
		MatSidenavModule,
		MatListModule,
		MatIconModule,
	],
	templateUrl: './sidenav.component.html',
	styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
	menuItems = [
		{
			icon: 'dashboard',
			label: 'Dashboard',
			route: 'example',
		},
		{
			icon: 'video_library',
			label: 'Content',
			route: 'example/detail/1',
		},
	];
}
