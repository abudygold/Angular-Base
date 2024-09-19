import {
	animate,
	animation,
	query,
	sequence,
	stagger,
	style,
} from '@angular/animations';

export const ANIMATION_PARAMS = {
	menuWidthLG: '280px',
	menuWidthXS: '65px',
	animationStyle: '200ms',
	animationEase: '500ms ease',
};

export const SIDEBAR_OPEN_ANIMATION = animation([
	query('.menu-item', [
		style({
			transform: `translateX(-${ANIMATION_PARAMS.menuWidthLG})`,
		}),
	]),
	sequence([
		animate(ANIMATION_PARAMS.animationStyle),
		query('.menu-item', [
			stagger(50, [
				animate(
					ANIMATION_PARAMS.animationEase,
					style({
						transform: 'none',
					})
				),
			]),
		]),
	]),
]);

export const SIDEBAR_CLOSE_ANIMATION = animation([
	query('.menu-item', [
		style({
			transform: 'none',
		}),
	]),
	sequence([
		query('.menu-item', [
			stagger(-50, [
				animate(
					ANIMATION_PARAMS.animationEase,
					style({
						transform: `translateX(-${ANIMATION_PARAMS.menuWidthXS})`,
					})
				),
			]),
		]),
		animate(ANIMATION_PARAMS.animationStyle),
	]),
]);
