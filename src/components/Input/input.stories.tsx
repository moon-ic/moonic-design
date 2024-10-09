import { Meta, StoryObj } from '@storybook/react';
import Input from './index';
import React from 'react';

const meta: Meta<typeof Input> = {
	component: Input,
	tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: 'default input'
	}
};

export const BDisabled = {
	name: 'Disabled input',
	args: {
		placeholder: 'disabled input',
		disabled: true
	}
};

export const CIcon = {
	name: 'Input with Icon',
	args: {
		placeholder: 'input with icon',
		icon: 'search'
	}
};

export const DSizeInput = () => (
	<>
		<Input defaultValue="large size" size="lg" />
		<Input placeholder="small size" size="sm" />
	</>
);
DSizeInput.storyName = '大小不同的 Input';

export const EPandInput = () => (
	<>
		<Input defaultValue="prepend text" prepend="https://" />
		<Input defaultValue="google" append=".com" />
	</>
);

EPandInput.storyName = '带前后缀的 Input';
