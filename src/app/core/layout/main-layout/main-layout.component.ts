import {
	animate,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
	Component,
	Inject,
	OnInit,
	PLATFORM_ID,
	ViewChild,
	ViewEncapsulation,
	signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';

import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

@Component({
	standalone: true,
	selector: 'app-main-layout',
	imports: [
		CommonModule,
		RouterOutlet,
		RouterModule,
		MatButtonModule,
		MatIconModule,
		MatDividerModule,
		MatToolbarModule,
		MatSidenavModule,
		MatListModule,
		ToastContainerDirective,
	],
	templateUrl: './main-layout.component.html',
	styleUrl: './main-layout.component.scss',
	animations: [
		trigger('slideInOut', [
			state(
				'in',
				style({
					transform: 'translate3d(0,0,0)',
				})
			),
			state(
				'out',
				style({
					transform: 'translate3d(100%, 0, 0)',
				})
			),
			transition('in => out', animate('400ms ease-in-out')),
			transition('out => in', animate('400ms ease-in-out')),
		]),
	],
	encapsulation: ViewEncapsulation.None,
})
export class MainLayoutComponent implements OnInit {
	menuItems = signal<any[]>([
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
	]);

	isBrowser!: boolean;
	isVisible: boolean = true;

	@ViewChild(ToastContainerDirective, { static: true })
	toastContainer!: ToastContainerDirective;

	constructor(
		@Inject(PLATFORM_ID) private platformId: string,
		private _toastrService: ToastrService
	) {}

	ngOnInit() {
		this.isBrowser = isPlatformBrowser(this.platformId);
		this._toastrService.overlayContainer = this.toastContainer;

		if (!this.isBrowser) this.isVisible = false;
	}
}
