import { FC } from 'react';
import Menu, { MenuProps } from './menu';
import MenuItem, { MenuItemProps } from './menuItem';
import './styles/index.scss';
import './styles/index.scss';

export type MenuComponent = FC<MenuProps> & {
	Item: FC<MenuItemProps>;
};

const TransMenu = Menu as MenuComponent;
TransMenu.Item = MenuItem;

export default TransMenu;
