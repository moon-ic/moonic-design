import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import Menu from './index';

const meta: Meta<typeof Menu> = {
	component: Menu,
	tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;
//@ts-ignore
export const ADefaultMenu: Story = (args) => (
	<div style={{ paddingBottom: '2vw' }}>
		<Menu defaultIndex="0" {...args}>
			<Menu.Item index="0">cool link</Menu.Item>
			<Menu.Item index="1">cool link 2</Menu.Item>
			<Menu.Item disabled index="2">
				disabled
			</Menu.Item>
			<Menu.SubMenu title="下拉选项">
				<Menu.Item index="31">下拉选项一</Menu.Item>
				<Menu.Item index="32">下拉选项二</Menu.Item>
			</Menu.SubMenu>
		</Menu>
	</div>
);
ADefaultMenu.storyName = '默认Menu';

//@ts-ignore
export const BClickMenu: Story = (args) => (
	<Menu {...args} defaultIndex="0" mode="vertical">
		<Menu.Item index="0">cool link</Menu.Item>
		<Menu.Item index="1">cool link 2</Menu.Item>
		<Menu.SubMenu title="点击下拉选项">
			<Menu.Item index="2">下拉选项一</Menu.Item>
			<Menu.Item index="3">下拉选项二</Menu.Item>
		</Menu.SubMenu>
	</Menu>
);
BClickMenu.storyName = '纵向的 Menu';

//@ts-ignore
export const COpenedMenu: Story = (args) => (
	<Menu {...args} defaultIndex="0" mode="vertical" defaultOpenSubMenus={['2']}>
		<Menu.Item index="0">cool link</Menu.Item>
		<Menu.Item index="1">cool link 2</Menu.Item>
		<Menu.SubMenu title="默认展开下拉选项">
			<Menu.Item index="2">下拉选项一</Menu.Item>
			<Menu.Item index="3">下拉选项二</Menu.Item>
		</Menu.SubMenu>
	</Menu>
);
COpenedMenu.storyName = '默认展开的纵向 Menu';
