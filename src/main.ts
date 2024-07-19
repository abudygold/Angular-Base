import {
	HTTP_INTERCEPTORS,
	provideHttpClient,
	withInterceptorsFromDi,
} from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
	provideRouter,
	withInMemoryScrolling,
	withRouterConfig,
	withEnabledBlockingInitialNavigation,
} from '@angular/router';

import { provideToastr } from 'ngx-toastr';

import { AppComponent } from './app/app.component';
import { AuthInterceptor, ErrorInterceptor } from './app/core/interceptors';
import { ROUTES_CONST } from './app/core/routing';

bootstrapApplication(AppComponent, {
	providers: [
		provideAnimations(),
		provideHttpClient(withInterceptorsFromDi()),
		provideRouter(
			ROUTES_CONST,
			withInMemoryScrolling({
				scrollPositionRestoration: 'top',
				anchorScrolling: 'enabled',
			}),
			withEnabledBlockingInitialNavigation(),
			withRouterConfig({
				paramsInheritanceStrategy: 'always',
				onSameUrlNavigation: 'reload',
			})
		),
		provideToastr({
			positionClass: 'inline',
			preventDuplicates: true,
			enableHtml: true,
			tapToDismiss: true,
			progressBar: true,
			progressAnimation: 'decreasing',
		}),
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorInterceptor,
			multi: true,
		},
	],
}).catch((err) => console.error(err));
