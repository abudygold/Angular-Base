import { TableModel } from '@adl/angular-ui';
import { Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

/* Dummy Data  */
interface UserData {
	id: string;
	name: string;
	progress: number;
	fruit: string;
	price: number | string;
	priceRupiah: number | string;
	approveTime: string;
}

const FRUITS: string[] = [
	'blueberry',
	'lychee',
	'kiwi',
	'mango',
	'peach',
	'lime',
	'pomegranate',
	'pineapple',
];
const NAMES: string[] = [
	'Maia',
	'Asher',
	'Olivia',
	'Atticus',
	'Amelia',
	'Jack',
	'Charlotte',
	'Theodore',
	'Isla',
	'Oliver',
	'Isabella',
	'Jasper',
	'Cora',
	'Levi',
	'Violet',
	'Arthur',
	'Mia',
	'Thomas',
	'Elizabeth',
];

const createNewUser = (id: number): UserData => {
	const name =
		NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
		' ' +
		NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
		'.';

	return {
		id: id.toString(),
		name: name,
		progress: Math.round(Math.random() * 100),
		fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
		price: '112000000',
		priceRupiah: '112000000',
		approveTime: '2024-02-27T12:42:04.629923+07:00',
	};
};
/* ./ Dummy Data  */

/* Table  */
const TableConfig = new TableModel();
TableConfig.labels = [
	'ID',
	'Name',
	'Progress',
	'Fruit',
	'Price',
	'Price Rupiah',
	'Approve Time',
];
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
		column: 'progress',
		type: 'string',
	},
	{
		column: 'fruit',
		type: 'string',
	},
	{
		column: 'price',
		type: 'currency',
		currencyOptions: {
			code: 'GBP',
			symbol: {
				code: 'symbol-narrow',
			},
		},
	},
	{
		column: 'priceRupiah',
		type: 'rupiah',
	},
	{
		column: 'approveTime',
		type: 'date',
		formatDate: 'YYYY-MM-dd',
	},
];
TableConfig.dataSource = new MatTableDataSource(
	Array.from({ length: 100 }, (_, k) => createNewUser(k + 1))
);

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
