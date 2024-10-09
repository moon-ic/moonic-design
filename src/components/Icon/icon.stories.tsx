import Icon from './icon';
import Button from '../Button/index';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
library.add(fas);

export default {
	tags: ['autodocs'],
	id: 'Icon',
	component: Icon
};
export const DefaultIcons = () => (
	<>
		<Icon icon="check" size="3x" />
		<Icon icon="times" size="3x" />
		<Icon icon="anchor" size="3x" />
		<Icon icon="trash" size="3x" />
		<Button size="lg" btnType="primary">
			<Icon icon="check" /> check{' '}
		</Button>
	</>
);
export const ThemeIcons = () => (
	<>
		<Icon icon="check" size="3x" theme="success" />
		<Icon icon="times" size="3x" theme="danger" />
		<Icon icon="anchor" size="3x" theme="primary" />
		<Icon icon="exclamation-circle" size="3x" theme="warning" />
	</>
);

export const CustomIcons = () => (
	<>
		<Icon icon="spinner" size="3x" theme="primary" spin />
		<Icon icon="spinner" size="3x" theme="success" pulse />
	</>
);
