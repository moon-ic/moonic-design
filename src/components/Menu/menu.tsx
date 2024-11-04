import React, {
	CSSProperties,
	FC,
	ReactNode,
	createContext,
	useState
} from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';

/** 点击子菜单触发的回调 */
type handleSelect = (selectIndex: string) => void;
type MenuMode = 'horizontal' | 'vertical';
export interface MenuProps {
	/**菜单类型 横向或者纵向 */
	mode?: MenuMode;
	/**默认 active 的菜单项的索引值 */
	defaultIndex?: string;
	/**点击菜单项触发的回掉函数 */
	onSelect?: handleSelect;
	/**设置子菜单的默认打开 只在纵向模式下生效 */
	defaultOpenSubMenus?: string[];
	className?: string;
	style?: CSSProperties;
	children?: ReactNode;
}

interface IMenuContext {
	/**item索引值 */
	index: string;
	mode?: MenuMode;
	onSelect?: handleSelect;
	defaultOpenSubMenus?: string[];
}
export const MenuContext = createContext<IMenuContext>({ index: '0' });

const Menu: FC<MenuProps> = ({
	defaultIndex = '0',
	mode = 'horizontal',
	onSelect,
	defaultOpenSubMenus = [],
	className,
	style,
	children
}) => {
	const [active, setActive] = useState<string>(defaultIndex as string);
	const cls = classNames('menu', className, {
		'menu-vertical': mode === 'vertical',
		'menu-horizontal': mode === 'horizontal'
	});
	const handleClick = (index: string) => {
		setActive(index);
		if (onSelect) onSelect(index);
	};
	const passedContext: IMenuContext = {
		index: active ? active : '0',
		onSelect: handleClick,
		mode,
		defaultOpenSubMenus
	};

	const renderChildren = () => {
		return React.Children.map(children, (child, index) => {
			const childElement =
				child as React.FunctionComponentElement<MenuItemProps>;
			const { displayName } = childElement.type;
			if (displayName === 'MenuItem' || displayName === 'SubMenu') {
				return React.cloneElement(childElement, {
					index: index.toString()
				});
			} else {
				console.error(
					'Warning: Menu has a child which is not a MenuItem component'
				);
			}
		});
	};

	return (
		<ul className={cls} style={style} data-testid="test-menu">
			<MenuContext.Provider value={passedContext}>
				{renderChildren()}
			</MenuContext.Provider>
		</ul>
	);
};

export default Menu;
