import React, { FC, ReactNode, useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';

export interface MenuItemProps {
	/**item索引值 */
	index?: string;
	/**是否禁用 */
	disabled?: boolean;
	className?: string;
	style?: React.CSSProperties;
	children?: ReactNode;
}

const MenuItem: FC<MenuItemProps> = (props) => {
	const { index, disabled, className, style, children } = props;
	const context = useContext(MenuContext);
	const cls = classNames('menu-item', className, {
		'is-disabled': disabled,
		'is-active': context.index === index
	});
	const handleClick = () => {
		if (context.onSelect && !disabled && typeof index === 'string') {
			context.onSelect(index);
		}
	};
	return (
		<li className={cls} style={style} onClick={handleClick}>
			{children}
		</li>
	);
};

MenuItem.displayName = 'MenuItem';
export default MenuItem;
