import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [CommonModule, RouterModule, RouterOutlet],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss',
})
export class RegisterComponent {
	unsavedChanges: boolean = true;

	hasUnsavedChanges(): boolean {
		return this.unsavedChanges;
	}
}
