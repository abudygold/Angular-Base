import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadingUIComponent } from './heading-ui.component';

describe('HeadingUIComponent', () => {
	let component: HeadingUIComponent;
	let fixture: ComponentFixture<HeadingUIComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HeadingUIComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(HeadingUIComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
