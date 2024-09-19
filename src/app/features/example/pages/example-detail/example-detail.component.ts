import { AdlLibModule } from '@adlfe/angular-ui';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';

import { CardUIComponent } from '../../../../shared/components/card-ui';
import { HeadingUIComponent } from '../../../../shared/components/heading-ui';

@Component({
	standalone: true,
	imports: [
		AdlLibModule,
		RouterModule,
		MatButtonModule,
		MatDividerModule,
		MatIconModule,
		MatCardModule,
		MatSlideToggleModule,
		MatTooltipModule,
		MatChipsModule,
		MatTabsModule,
		CardUIComponent,
		HeadingUIComponent,
	],
	selector: 'app-example-detail',
	templateUrl: './example-detail.component.html',
	styleUrl: './example-detail.component.scss',
})
export class ExampleDetailComponent {
	tooltipPosition: 'above' | 'below' | 'before' | 'after' = 'above';

	constructor(private router: Router) {}

	onHoverTooltip(): void {
		setTimeout(() => {
			document.getElementsByClassName('mdc-tooltip__surface')[0].innerHTML =
				`<p class="tw-font-bold !tw-mb-0">This is a tooltip</p>`;
		});
	}

	onHoverTooltipHTML(): void {
		setTimeout(() => {
			document.getElementsByClassName('mat-mdc-tooltip-panel')[0].className +=
				' html-tooltip';
			document.getElementsByClassName('mdc-tooltip__surface')[0].innerHTML =
				`<p class="tw-font-bold !tw-mb-2">This is a tooltip</p>
				<p class="!tw-mb-0">Tooltips are used to describe or identify an <br /> element. In most scenarios, tooltips help the user <br /> understand the meaning, function or alt-text of an <br /> element.</p>
				`;
		});
	}

	onDeleteTag(): void {
		alert('delete');
	}

	onChipChangeHandler(value: string): void {
		console.log(value);
	}

	navigateToList(): void {
		this.router.navigate(['/secure/example']);
	}
}
