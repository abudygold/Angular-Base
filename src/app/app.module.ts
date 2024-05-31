import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { AdlLibModule } from '@adl/angular-ui';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatDialogModule,
		AdlLibModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
