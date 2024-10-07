// 利用css-transition实现自定义动画
import React, { FC, ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type AnimationName =
	| 'zoom-in-top'
	| 'zoom-in-left'
	| 'zoom-in-bottom'
	| 'zoom-in-right';

type TransitionProps = CSSTransitionProps & {
	animation?: AnimationName;
	wrapper?: boolean;
	children?: ReactNode;
};

const Transition: FC<TransitionProps> = (props) => {
	const {
		unmountOnExit = true, //动态添加节点
		appear = true,
		wrapper, //添加一个外包装避免覆盖动画
		classNames,
		animation,
		children,
		...restProps
	} = props;
	return (
		<CSSTransition
			className={classNames ? classNames : animation}
			{...restProps}
		>
			{wrapper ? <div>{children}</div> : children}
		</CSSTransition>
	);
};

export default Transition;
