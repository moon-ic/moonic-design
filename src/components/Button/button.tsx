import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from 'react';
import classNames from 'classnames';

export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link';
interface BaseButtonProps {
	/** 是否禁用 */
	disabled?: boolean;
	/** Button尺寸 */
	size?: ButtonSize;
	/** Button类型 */
	btnType?: ButtonType;
	className?: string;
	style?: React.CSSProperties;
	href?: string;
	children: React.ReactNode;
}
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: FC<ButtonProps> = (props) => {
	const {
		/** 类型 */
		btnType = 'default',
		/** 可见 */
		disabled = false,
		/** 大小 */
		size = 'sm',
		children,
		href,
		className,
		style,
		...restProps
	} = props;
	const cls = classNames('btn', className, {
		[`btn-${btnType}`]: btnType,
		[`btn-${size}`]: size,
		disabled: btnType === 'link' && disabled
	});
	if (btnType === 'link' && href) {
		return (
			<a className={cls} style={style} href={href} {...restProps}>
				{children}
			</a>
		);
	} else {
		return (
			<button className={cls} style={style} disabled={disabled} {...restProps}>
				{children}
			</button>
		);
	}
};

export default Button;
