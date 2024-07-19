import { Validators } from '@angular/forms';

/* Form  */
const SampleForm = {
	name: {
		validators: [Validators.required],
		validationMessages: [{ type: 'required', message: 'Name is required' }],
	},
	email: {
		validators: [Validators.required, Validators.email],
		validationMessages: [
			{ type: 'required', message: 'Email is required' },
			{ type: 'email', message: "Email format doesn't correct" },
		],
	},
	body: {
		validators: [Validators.required, Validators.maxLength(250)],
		validationMessages: [
			{ type: 'required', message: 'Body is required' },
			{ type: 'maxlength', message: 'Body can be at most 250 characters' },
		],
	},
};
/* ./ Form  */

export const SAMPLE_FORM_CONST = SampleForm;
