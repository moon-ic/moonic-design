import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from 'react';
import classNames from 'classnames';

export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link';
interface BaseButtonProps {
	className?: string;
	disabled?: boolean;
	size?: ButtonSize;
	btnType?: ButtonType;
	children: React.ReactNode;
	href?: string;
}
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: FC<ButtonProps> = (props) => {
	const {
		btnType = 'default',
		disabled = false,
		size,
		children,
		href,
		className,
		...restProps
	} = props;
	const cls = classNames('btn', className, {
		[`btn-${btnType}`]: btnType,
		[`btn${size}`]: size,
		disabled: btnType === 'link' && disabled
	});
	if (btnType === 'link' && href) {
		return (
			<a className={cls} href={href} {...restProps}>
				{children}
			</a>
		);
	} else {
		return (
			<button className={cls} disabled={disabled} {...restProps}>
				{children}
			</button>
		);
	}
};

export default Button;
