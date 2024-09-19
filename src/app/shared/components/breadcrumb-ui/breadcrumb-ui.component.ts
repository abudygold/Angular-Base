import { NgClass, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Title } from '@angular/platform-browser';
import {
	ActivatedRoute,
	ActivatedRouteSnapshot,
	NavigationEnd,
	Router,
	RouterModule,
} from '@angular/router';

import { filter, map } from 'rxjs';

import { CardUIComponent } from '../card-ui';

@Component({
	standalone: true,
	selector: 'app-breadcrumb-ui',
	imports: [NgClass, NgForOf, RouterModule, CardUIComponent, MatCardModule],
	templateUrl: './breadcrumb-ui.component.html',
	styleUrl: './breadcrumb-ui.component.scss',
})
export class BreadcrumbUIComponent implements OnInit {
	breadcrumbs: any[] = [];

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private title: Title
	) {}

	ngOnInit(): void {
		this.getBreadcrumb();
	}

	private getBreadcrumb(): void {
		this.router.events
			.pipe(
				filter((event) => {
					/* The breadcrumb will be from the local storage if the navigation end is false */
					if (
						event instanceof NavigationEnd === false &&
						localStorage.getItem('breadcrumb-active')
					) {
						this.breadcrumbs = JSON.parse(
							localStorage.getItem('breadcrumb-active') ?? ''
						);
						this.title.setTitle([...this.breadcrumbs]?.pop()?.name);
					}

					return event instanceof NavigationEnd;
				}),
				map(() => this.activatedRoute.snapshot),
				map((route) => {
					while (route.firstChild) {
						route = route.firstChild;
					}

					return route;
				})
			)
			.subscribe((route: ActivatedRouteSnapshot) => {
				if (route.params['id']) {
					const getRoute = route.data['breadcrumb'].find((breadcrumb: any) =>
						breadcrumb.link.includes(
							window.location.pathname.substring(
								0,
								window.location.pathname.lastIndexOf('/') + 1
							)
						)
					);

					getRoute.link = getRoute?.link?.replace(':id', route.params['id']);
				}

				this.breadcrumbs = route.data['breadcrumb'];
				this.title.setTitle([...route.data['breadcrumb']]?.pop()?.name);

				if (this.breadcrumbs)
					localStorage.setItem(
						'breadcrumb-active',
						JSON.stringify(this.breadcrumbs)
					);
			});
	}
}
