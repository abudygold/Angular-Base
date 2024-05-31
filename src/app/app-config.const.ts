import { TableModel } from '@adl/angular-ui';
import { Validators } from '@angular/forms';

/* Table  */
const TableConfig = new TableModel();
TableConfig.labels = ['ID', 'Name', 'Age', 'Colour'];
TableConfig.columns = [
	{
		column: 'id',
		type: 'string',
	},
	{
		column: 'name',
		type: 'string',
	},
	{
		column: 'age',
		type: 'number',
	},
	{
		column: 'colour',
		type: 'string',
	},
];
/* ./ Table  */

/* Form  */
const SampleForm = {
	firstName: {
		validators: [
			Validators.required,
			Validators.minLength(10),
			Validators.maxLength(30),
		],
		validationMessages: [
			{ type: 'required', message: 'First name is required' },
			{ type: 'minlength', message: 'Minimum characters: 10' },
			{ type: 'maxlength', message: 'Maximum characters: 30' },
		],
	},
	lastName: {
		validators: [Validators.required, Validators.maxLength(30)],
		validationMessages: [
			{ type: 'required', message: 'Last name is required' },
			{ type: 'maxlength', message: 'Maximum characters: 30' },
		],
	},
	gender: {
		validators: [Validators.required],
		validationMessages: [{ type: 'required', message: 'Gender is required' }],
	},
	hobby: {
		validators: [Validators.required],
		validationMessages: [{ type: 'required', message: 'Hobby is required' }],
	},
};
/* ./ Form  */

export const TABLE_USER_CONST = TableConfig;
export const SAMPLE_FORM_CONST = SampleForm;
export const RESOURCE_PATH_CONST =
	'https://crudcrud.com/api/b5bee03bb615487a8c54290a5eaf09cf';
