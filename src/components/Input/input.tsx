import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import Icon from '../Icon/icon';
import React, {
	ChangeEvent,
	FC,
	InputHTMLAttributes,
	ReactElement
} from 'react';

type InputSize = 'lg' | 'sm';
export interface InputProps
	extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
	/**是否禁用Input */
	disabled?: boolean;
	/**input大小 */
	size?: InputSize;
	/**添加图标，在右侧悬浮添加一个图标，用于提示 */
	icon?: IconProp;
	/**添加前缀 用于配置一些固定组合 */
	prepend?: string | ReactElement;
	/**添加后缀 用于配置一些固定组合 */
	append?: string | ReactElement;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = (props) => {
	const {
		disabled,
		size,
		icon,
		prepend,
		append,
		style,
		className,
		...restProps
	} = props;
	const cls = classNames('input-wrapper', {
		[`input-size-${size}`]: size,
		'is-disabled': disabled,
		'input-group': prepend || append,
		'input-group-append': !!append,
		'input-group-prepend': !!prepend
	});
	return (
		<div className={cls} style={style}>
			{prepend && <div className="input-group-prepend">{prepend}</div>}
			{icon && (
				<div>
					<Icon icon={icon} title={`title-${icon}`} />
				</div>
			)}
			<input className="input-inner" disabled={disabled} {...restProps} />
			{append && <div className="input-group-append">{append}</div>}
		</div>
	);
};

export default Input;
