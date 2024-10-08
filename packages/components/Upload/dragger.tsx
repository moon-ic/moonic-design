import React, { FC, ReactNode, useState, DragEvent } from 'react';
import classNames from 'classnames';

interface DraggerProps {
	/** 上传操作 */
	onFile: (file: FileList) => void;
	/** 上传区域 */
	children?: ReactNode;
}

const Dragger: FC<DraggerProps> = (props) => {
	const { onFile, children } = props;
	const [dragOver, setDragOver] = useState(false);
	const cls = classNames('upload-dragger', {
		'is-dragover': dragOver
	});
	const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
		e.preventDefault();
		setDragOver(over);
	};
	const handleDrop = (e: DragEvent<HTMLElement>) => {
		e.preventDefault();
		setDragOver(false);
		onFile(e.dataTransfer.files);
	};
	return (
		<div
			className={cls}
			onDragOver={(e) => handleDrag(e, true)}
			onDragLeave={(e) => handleDrag(e, false)}
			onDrop={(e) => handleDrop(e)}
		>
			{children}
		</div>
	);
};

export default Dragger;
