import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUIComponent } from './card-ui.component';

describe('CardUIComponent', () => {
	let component: CardUIComponent;
	let fixture: ComponentFixture<CardUIComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CardUIComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CardUIComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
