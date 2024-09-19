import { AdlLibModule } from '@adlfe/angular-ui';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
	standalone: true,
	imports: [MatIconModule, MatButtonModule, MatDividerModule, AdlLibModule],
	selector: 'app-example-list-filter',
	templateUrl: './example-list-filter.component.html',
	styleUrl: './example-list-filter.component.scss',
})
export class ExampleListFilterComponent {
	@Output()
	closeHandler: EventEmitter<void> = new EventEmitter();

	@Output()
	filterHandler: EventEmitter<any> = new EventEmitter();

	filter: any = {
		fullname: '',
		color: '',
	};

	@Input()
	set filterValue(value: any) {
		this.filter.fullname = value?.fullname ?? '';
		this.filter.color = value?.color ?? '';
	}

	assignData(value: string, key: string): void {
		this.filter[key] = value;
	}

	onReset(): void {
		this.filter = {
			fullname: '',
			color: '',
		};

		this.onFilter();
	}

	onFilter(): void {
		this.filterHandler.emit(this.filter);
		this.onClose();
	}

	onClose(): void {
		this.closeHandler.emit();
	}
}
