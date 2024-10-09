import React, { ChangeEvent, FC, ReactNode, useRef, useState } from 'react';
import axios from 'axios';
import UploadList from './uploadList';
import Dragger from './dragger';

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
	uid: string;
	size: number;
	name: string;
	status?: UploadFileStatus;
	percent?: number;
	raw?: File;
	response?: any;
	error?: any;
}

export interface UploadProps {
	/** 上传地址 */
	action: string;
	/** 上传文件列表 */
	defaultFileList?: UploadFile[];
	/** 生命周期函数 上传前 */
	beforeUpload?: (file: File) => boolean | Promise<File>;
	/** 生命周期函数 上传中 */
	onProgress?: (percentage: number, file: UploadFile) => void;
	/** 生命周期函数 发送状态改变 */
	onChange?: (file: UploadFile) => void;
	/** 生命周期函数 上传成功 */
	onSuccess?: (data: any, file: UploadFile) => void;
	/** 生命周期函数 上传失败 */
	onError?: (err: any, file: UploadFile) => void;
	/** 移除选中文件  */
	onRemove?: (file: UploadFile) => void;
	/** 上传请求头 */
	headers?: { [key: string]: any };
	/** 上传文件字段名 */
	name?: string;
	/** 上传额外参数 */
	data?: { [key: string]: any };
	/** 发送时是否携带cookie */
	withCredentials?: boolean;
	/** 接受文件类型 */
	accept?: string;
	/** 接受上传多个文件 */
	multiple?: boolean;
	/** 上传区域|组件 */
	children?: ReactNode;
	/** 是否支持拖拽上传 */
	drag?: boolean;
}

const Upload: FC<UploadProps> = (props) => {
	const {
		action,
		beforeUpload,
		onProgress,
		onChange,
		onSuccess,
		onError,
		onRemove,
		name = 'file',
		headers,
		data,
		withCredentials,
		accept,
		multiple,
		children,
		drag
	} = props;
	const fileInput = useRef<HTMLInputElement>(null);
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	const handleClick = () => {
		if (fileInput.current) {
			fileInput.current.click();
		}
	};
	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files) return;
		uploadFiles(files);
		if (fileInput.current) {
			fileInput.current.value = '';
		}
	};
	const handleRemove = (file: UploadFile) => {
		setFileList((prevList) => {
			return prevList.filter((item) => item.uid !== file.uid);
		});
		if (onRemove) {
			onRemove(file);
		}
	};

	const updateFileList = (
		updateFile: UploadFile,
		updateObj: Partial<UploadFile>
	) => {
		setFileList((prevList) => {
			return prevList.map((file) => {
				if (file.uid === updateFile.uid) {
					return { ...file, ...updateObj };
				} else {
					return file;
				}
			});
		});
	};
	const uploadFiles = (files: FileList) => {
		let postFiles = Array.from(files);
		postFiles.forEach((file) => {
			if (!beforeUpload) {
				post(file);
			} else {
				const res = beforeUpload(file);
				if (res && res instanceof Promise) {
					res.then((processFile) => {
						post(processFile);
					});
				} else if (res !== false) {
					post(file);
				}
			}
		});
	};
	const post = (file: File) => {
		let _file: UploadFile = {
			uid: Date.now() + 'upload-file',
			status: 'ready',
			name: file.name,
			size: file.size,
			percent: 0,
			raw: file
		};
		setFileList((prevList) => {
			return [_file, ...prevList];
		});
		const formData = new FormData();
		formData.append(name || 'file', file);
		if (data) {
			Object.keys(data).forEach((key) => {
				formData.append(key, data[key]);
			});
		}
		axios
			.post(action, formData, {
				headers: {
					...headers,
					'Content-Type': 'multipart/form-data'
				},
				withCredentials,
				onUploadProgress: (e) => {
					let percentage =
						Math.round((e.loaded * 100) / (e.total as number)) || 0;
					updateFileList(_file, { percent: percentage, status: 'uploading' });
					if (percentage < 100) {
						if (onProgress) onProgress(percentage, _file);
					}
				}
			})
			.then((resp) => {
				console.log(resp);
				updateFileList(_file, { status: 'success', response: resp });
				if (onSuccess) onSuccess(resp.data, _file);
				if (onChange) onChange(_file);
			})
			.catch((err: any) => {
				console.error(err);
				updateFileList(_file, { status: 'error', error: err });
				if (onError) onError(err, _file);
				if (onChange) onChange(_file);
			});
	};

	return (
		<div className="upload-component">
			<div
				className="upload-input"
				onClick={handleClick}
				style={{ display: 'inline-block' }}
			>
				{drag ? (
					<Dragger
						onFile={(files) => {
							uploadFiles(files);
						}}
					>
						{children}
					</Dragger>
				) : (
					children
				)}
				<input
					className="file-input"
					style={{ display: 'none' }}
					ref={fileInput}
					onChange={handleFileChange}
					type="file"
					accept={accept}
					multiple={multiple}
				/>
			</div>
			<UploadList fileList={fileList} onRemove={handleRemove} />
		</div>
	);
};
export default Upload;
