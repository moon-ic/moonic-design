import React, { FC } from 'react';
import { ThemeProps } from '../Icon/icon';
export interface ProgressProps {
	/** 上传百分比 */
	percent: number;
	/** 进度条高度 */
	strokeHeight?: number;
	/** 是否显示进度 */
	showText?: boolean;
	/** 主题颜色 */
	theme?: ThemeProps;
	styles?: React.CSSProperties;
}

const Progress: FC<ProgressProps> = (props) => {
	const {
		percent,
		strokeHeight = 15,
		showText = true,
		styles,
		theme = 'primary'
	} = props;
	return (
		<div className="progress-bar" style={styles}>
			<div
				className="progress-bar-outer"
				style={{ height: `${strokeHeight}px` }}
			>
				<div
					className={`progress-bar-inner color-${theme}`}
					style={{ width: `${percent}%` }}
				>
					{showText && <span className="inner-text">{`${percent}%`}</span>}
				</div>
			</div>
		</div>
	);
};

export default Progress;
