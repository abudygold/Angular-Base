import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleListFilterComponent } from './example-list-filter.component';

describe('ExampleListFilterComponent', () => {
  let component: ExampleListFilterComponent;
  let fixture: ComponentFixture<ExampleListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleListFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
