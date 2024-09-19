import {
	state,
	style,
	transition,
	trigger,
	useAnimation,
} from '@angular/animations';
import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

import { Subscription } from 'rxjs';

import { BreadcrumbUIComponent } from '../../../shared/components/breadcrumb-ui';
import { APP_TITLE } from '../../../shared/constant';
import {
	ANIMATION_PARAMS,
	SIDEBAR_CLOSE_ANIMATION,
	SIDEBAR_OPEN_ANIMATION,
} from '../../animation';
import { SidenavComponent } from '../components/sidenav';
import { ToolbarComponent } from '../components/toolbar';

@Component({
	standalone: true,
	selector: 'app-main-layout',
	imports: [
		NgClass,
		RouterOutlet,
		MatSidenavModule,
		BreadcrumbUIComponent,
		ToolbarComponent,
		SidenavComponent,
	],
	templateUrl: './main-layout.component.html',
	styleUrl: './main-layout.component.scss',
	animations: [
		trigger('slideInOut', [
			state(
				'in',
				style({
					width: ANIMATION_PARAMS.menuWidthLG,
					position: 'fixed',
				})
			),
			state(
				'out',
				style({
					width: ANIMATION_PARAMS.menuWidthXS,
					position: 'fixed',
				})
			),
			transition('in => out', [useAnimation(SIDEBAR_CLOSE_ANIMATION)]),
			transition('out => in', [useAnimation(SIDEBAR_OPEN_ANIMATION)]),
		]),
		/* trigger('slideInOut', [
			state(
				'in',
				style({
					width: '280px',
					position: 'fixed',
				})
			),
			state(
				'out',
				style({
					width: '65px',
					position: 'fixed',
				})
			),
			transition('in => out', animate('250ms ease-in-out')),
			transition('out => in', animate('250ms ease-in-out')),
		]), */
	],
	encapsulation: ViewEncapsulation.None,
})
export class MainLayoutComponent implements OnInit, OnDestroy {
	isVisible: boolean = false;
	appTitle: string = APP_TITLE;
	filterOpened: boolean = false;

	private subscribers: Subscription[] = [];

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.subscribers.push(
			this.activatedRoute.queryParams.subscribe(
				(resp) => (this.filterOpened = resp['opened'] ?? false)
			)
		);

		setTimeout(() => this.backdropClickHandler());
	}

	get isMobile(): boolean {
		const regex =
			/Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
		return regex.test(navigator.userAgent);
	}

	backdropClickHandler(): void {
		if (document.getElementById('list-filter'))
			document.getElementById('list-filter')!.style.display = 'none';

		const params = { ...this.activatedRoute.snapshot.queryParams };
		delete params['opened'];

		this.filterOpened = false;
		this.router.navigate([], { queryParams: params });
	}

	ngOnDestroy(): void {
		this.subscribers.forEach((each) => each.unsubscribe());
	}
}
