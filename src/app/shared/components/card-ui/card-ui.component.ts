import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
	standalone: true,
	imports: [MatCardModule],
	selector: 'app-card-ui',
	templateUrl: './card-ui.component.html',
	styleUrl: './card-ui.component.scss',
})
export class CardUIComponent {}
