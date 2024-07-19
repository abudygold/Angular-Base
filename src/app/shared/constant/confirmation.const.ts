import { IConfirmation } from '@adlfe/angular-ui';

export const CONFIRMATION_DELETE_CONST = (
	length: number,
	module: string
): IConfirmation => {
	return {
		title: 'Confirmation',
		content: `<p>Are you sure you want to delete this <strong>${length} ${module}${length > 1 ? '(s)' : ''}</strong>?</p>`,
		submitBtn: 'Delete',
		cancelBtn: 'Cancel',
	};
};
