import React, {
	CSSProperties,
	Children,
	FC,
	MouseEventHandler,
	ReactNode,
	useContext,
	useState
} from 'react';
import { MenuContext } from './menu';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';
import Icon from '../Icon';
import Transition from '../Transition/index';

export interface SubMenuProps {
	index?: string;
	/** 标题 */
	title: string;
	className?: string;
	style?: CSSProperties;
	children?: ReactNode;
}

const SubMenu: FC<SubMenuProps> = ({
	index,
	title,
	className,
	style,
	children
}) => {
	const context = useContext(MenuContext);
	const openSubMenus = context.defaultOpenSubMenus as Array<string>;
	const isOpened =
		index && context.mode === 'vertical' ? openSubMenus.includes(index) : false;
	const [menuOpen, setOpen] = useState(isOpened);
	const cls = classNames('menu-item submenu-item', className, {
		'is-active': context.index === index,
		'is-opened': menuOpen,
		'is-vertical': context.mode === 'vertical'
	});

	const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
		e.preventDefault();
		setOpen(!menuOpen);
	};
	let timer: any;
	const handleMouse = (e: MouseEvent, toggle: boolean) => {
		clearTimeout(timer);
		e.preventDefault();
		timer = setTimeout(() => {
			setOpen(toggle);
		}, 300);
	};
	const clickEvents =
		context.mode === 'vertical'
			? {
					onclick: handleClick
				}
			: {};
	const hoverEvents =
		context.mode === 'horizontal'
			? {
					onmouseenter: (e: MouseEvent) => {
						handleMouse(e, true);
					},
					onmouseleave: (e: MouseEvent) => {
						handleMouse(e, false);
					}
				}
			: {};

	const renderChildren = () => {
		const subMenuCls = classNames('submenu', {
			'menu-opened': menuOpen
		});
		const childrenComponent = Children.map(children, (child, i) => {
			const childElement =
				child as React.FunctionComponentElement<MenuItemProps>;
			const { displayName } = childElement.type;
			if (displayName === 'MenuItem' || displayName === 'SubMenu') {
				return React.cloneElement(childElement, {
					index: `${index}-${i}` //父-子
				});
			} else {
				console.error(
					'Warning: SubMenu has a child which is not a MenuItem component'
				);
			}
		});
		return (
			<Transition in={menuOpen} timeout={300} animation="zoom-in-top">
				<ul className={subMenuCls}>{childrenComponent}</ul>
			</Transition>
		);
	};

	return (
		<li key={index} className={cls} style={style} {...hoverEvents}>
			<div className="submenu-title" {...clickEvents}>
				{title}
				<Icon icon="angle-down" className="arrow-icon" />
			</div>
			{renderChildren()}
		</li>
	);
};

SubMenu.displayName = 'SubMenu';
export default SubMenu;
