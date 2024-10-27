import React, { FC } from 'react';
import {
	FontAwesomeIcon,
	FontAwesomeIconProps
} from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

export type ThemeProps =
	| 'primary'
	| 'secondary'
	| 'success'
	| 'warning'
	| 'danger'
	| 'light'
	| 'dark';

export interface IconProps extends FontAwesomeIconProps {
	/**支持框架主题：不同颜色*/
	theme?: ThemeProps;
}

const Icon: FC<IconProps> = (props) => {
	const { className, theme, ...restProps } = props;
	const cls = classNames('icon', className, {
		[`icon-${theme}`]: theme
	});
	return <FontAwesomeIcon className={cls} {...restProps} />;
};

export default Icon;
