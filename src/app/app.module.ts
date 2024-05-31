import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { AdlLibModule } from '@adl/angular-ui';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MatDialogModule,
		AdlLibModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
