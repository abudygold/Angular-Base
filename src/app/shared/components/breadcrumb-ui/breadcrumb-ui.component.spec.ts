import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbUIComponent } from './breadcrumb-ui.component';

describe('BreadcrumbUIComponent', () => {
	let component: BreadcrumbUIComponent;
	let fixture: ComponentFixture<BreadcrumbUIComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [BreadcrumbUIComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(BreadcrumbUIComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
