import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

import { Subject } from 'rxjs';

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
	changes = new Subject<void>();

	firstPageLabel = 'First page';
	itemsPerPageLabel = 'Items per page:';
	lastPageLabel = 'Last page';
	nextPageLabel = 'Next page';
	previousPageLabel = 'Previous page';

	constructor() {
		localStorage.setItem('isFirstRenderPagination', 'false');
	}

	getRangeLabel = (page: number, pageSize: number, length: number) => {
		if (length === 0 || pageSize === 0) {
			return `0 of ${length} item`;
		}

		length = Math.max(length, 0);

		const startIndex = page * pageSize;
		const endIndex =
			startIndex < length
				? Math.min(startIndex + pageSize, length)
				: startIndex + pageSize;

		this.createPaginationListDiv(Array.from(Array(page + 1).keys()), page);

		return `${startIndex + 1} - ${endIndex} of ${length} item`;
	};

	private createPaginationListDiv(pages: number[], page: number): void {
		if (localStorage.getItem('isFirstRenderPagination') === 'true') return;

		localStorage.setItem('isFirstRenderPagination', 'true');

		setTimeout(() => {
			const actionContainer = document.querySelector(
				'div.mat-mdc-paginator-range-actions'
			);

			const movePageContainerRef = document.createElement('div') as HTMLElement;
			movePageContainerRef.className = 'pagination__list';
			movePageContainerRef.innerHTML = `<select class="pagination__change" id="pagination__change">
                ${pages.map((data) => `<option value="${data + 1}" ${page === data ? 'selected' : ''}>${data + 1}</option>`)}
            </select> of ${pages.length}`;

			actionContainer?.insertBefore(
				movePageContainerRef,
				actionContainer.children[1]
			);
		});
	}
}
