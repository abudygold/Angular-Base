import { TableModel } from '@adlfe/angular-ui';

/* Table  */
const TableConfig = new TableModel();
TableConfig.isPagination = true;
TableConfig.tableClass = 'table__bordered';
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
				filePath: './assets/icon-list/preview.svg',
				tooltips: 'Preview Icon',
			},
			{
				name: 'edit',
				filePath: './assets/icon-list/edit.svg',
				tooltips: 'Edit Icon',
			},
			{
				name: 'delete',
				filePath: './assets/icon-list/delete.svg',
				tooltips: 'Delete Icon',
			},
		],
	},
];
/* ./ Table  */

export const TABLE_USER_CONST = TableConfig;
