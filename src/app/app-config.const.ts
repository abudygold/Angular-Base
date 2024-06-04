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
	fullName: {
		validators: [Validators.required],
		validationMessages: [
			{ type: 'required', message: 'Full name is required' },
		],
	},
	email: {
		validators: [Validators.required, Validators.email],
		validationMessages: [
			{ type: 'required', message: 'Email is required' },
			{ type: 'email', message: "Email format doesn't correct" },
		],
	},
	body: {
		validators: [Validators.required],
		validationMessages: [{ type: 'required', message: 'Body is required' }],
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
export const COMMENT_PATH_CONST =
	'https://jsonplaceholder.typicode.com/comments';
export enum ACTIVE_ENUM {
	'Active' = 0,
	'Deactivate' = 1,
}
