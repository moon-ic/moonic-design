import { Meta, StoryObj } from '@storybook/react';
import '../../../dist/index.css';
import Button from './index';
import React from 'react';

const meta: Meta<typeof Button> = {
	component: Button,
	tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// 模板函数
const Template: Story = {
	render: (args) => <Button {...args} />
};

export const Default: Story = {
	...Template,
	args: {
		btnType: 'default',
		children: 'Button'
	}
};

export const Primary: Story = {
	...Template,
	args: {
		btnType: 'primary',
		children: 'Primary Button'
	}
};

export const Large: Story = {
	...Template,
	args: {
		size: 'lg',
		children: 'Large Button'
	}
};

export const Small: Story = {
	...Template,
	args: {
		size: 'sm',
		children: 'Small Button'
	}
};
