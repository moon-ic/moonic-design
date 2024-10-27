import React, {
	ReactNode,
	CSSProperties,
	useState,
	useContext,
	ReactElement,
	useEffect,
	ChangeEvent
} from 'react';
import classNames from 'classnames';
import Schema from 'async-validator';
import { FormContext } from './form';

export interface ItemProps {
	/**标签 */
	label?: ReactNode;
	/**名字，唯一标识  */
	name?: string;
	/**子组件属性名 */
	valuePropName?: string;
	/**校验规则数组 */
	rules?: Array<Record<string, any>>;
	className?: string;
	style?: CSSProperties;
	children?: ReactElement;
}

/** 从事件对象，提取表单控件值 */
const getValueFromEvent = (e: ChangeEvent<HTMLInputElement>) => {
	const { target } = e;
	if (target.type === 'checkbox') {
		return target.checked;
	} else if (target.type === 'radio') {
		return target.value;
	}
	return target.value;
};

const Item = (props: ItemProps) => {
	const { className, label, children, style, name, valuePropName, rules } =
		props;
	if (!name) {
		return children;
	}
	const [value, setValue] = useState<string | number | boolean>();
	const [error, setError] = useState('');
	const { onValueChange, storeValues, validateRegister } =
		useContext(FormContext);

	/**校验函数 */
	const handleValidate = (value: any) => {
		let errorMsg = null;
		if (Array.isArray(rules) && rules.length) {
			const validator = new Schema({
				[name]: rules.map((rule) => {
					return {
						type: 'string',
						...rule
					};
				})
			});
			validator.validate({ [name]: value }, (errors) => {
				if (errors) {
					if (errors?.length) {
						setError(errors[0].message!);
						errorMsg = errors[0].message;
					}
				} else {
					setError('');
					errorMsg = null;
				}
			});
		}
		return errorMsg;
	};

	const propsName: Record<string, any> = {};
	if (valuePropName) {
		propsName[valuePropName] = value;
	} else {
		propsName.value = value;
	}
	const childEle =
		React.Children.toArray(children).length > 1
			? children
			: React.cloneElement(children!, {
					...propsName,
					onChange: (e: ChangeEvent<HTMLInputElement>) => {
						const value = getValueFromEvent(e);
						setValue(value);
						onValueChange?.(name, value);

						handleValidate(value);
					}
				});

	const cls = classNames('form-item', className);

	useEffect(() => {
		if (value !== storeValues?.[name]) {
			setValue(storeValues?.[name]);
		}
	}, [storeValues, storeValues?.[name]]);
	useEffect(() => {
		validateRegister?.(name, () => handleValidate(value));
	}, [value]);

	return (
		<div className={cls} style={style}>
			<div>{label && <label>{label}</label>}</div>
			<div>
				{childEle}
				{error && <div style={{ color: 'red' }}>{error}</div>}
			</div>
		</div>
	);
};

export default Item;
