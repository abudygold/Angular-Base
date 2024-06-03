import { TableModel } from '@adl/angular-ui';
import { Validators } from '@angular/forms';

/* Table  */
const TableConfig = new TableModel();
TableConfig.isPagination = true;
TableConfig.labels = ['ID', 'Name', 'Email', 'Body', 'Actions'];
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
		column: 'email',
		type: 'string',
	},
	{
		column: 'body',
		type: 'string',
	},
	{
		column: 'actions',
		type: 'actions',
		actions: [
			{
				name: 'preview',
				filePath: './assets/svg/preview.svg',
				tooltips: 'Preview Icon',
			},
			{
				name: 'edit',
				filePath: './assets/svg/edit.svg',
				tooltips: 'Edit Icon',
			},
			{
				name: 'delete',
				filePath: './assets/svg/delete.svg',
				tooltips: 'Delete Icon',
			},
		],
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
export const UNICORN_PATH_CONST =
	'https://jsonplaceholder.typicode.com/comments';
export enum ACTIVE_ENUM {
	'Active' = 0,
	'Deactivate' = 1,
}
