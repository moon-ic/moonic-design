import classNames from 'classnames';
import React, {
	CSSProperties,
	FC,
	FormEvent,
	ReactNode,
	createContext,
	useRef,
	useState
} from 'react';

export interface FormContextProps {
	/**store值 */
	values?: Record<string, any>;
	/**修改value */
	setValues?: (values: Record<string, any>) => void;
	/**监听value变化函数 */
	onValueChange?: (key: string, value: any) => void;
	/**注册表单项校验规则 */
	validateRegister?: (name: string, cb: Function) => void;
}
export const FormContext = createContext<FormContextProps>({});

export interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
	/**初始值 */
	initialValues?: Record<string, any>;
	/**提交回调 */
	onFinish?: (values: Record<string, any>) => void;
	/**提交错误回调 */
	onFinishFailed?: (errors: Record<string, any>) => void;
	className?: string;
	style?: CSSProperties;
	children?: ReactNode;
}

const Form: FC<FormProps> = (props) => {
	const {
		className,
		style,
		children,
		onFinish,
		onFinishFailed,
		initialValues,
		...restProps
	} = props;
	const [values, setValues] = useState<Record<string, any>>(
		initialValues || {}
	);
	const validatorMap = useRef(new Map<string, Function>());
	const errors = useRef<Record<string, any>>({});

	const onValueChange = (key: string, value: any) => {
		values[key] = value;
	};
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		for (let [key, callbackFunc] of validatorMap.current) {
			if (typeof callbackFunc === 'function') {
				errors.current[key] = callbackFunc();
			}
		}
		const errorList = Object.keys(errors.current)
			.map((key) => {
				return errors.current[key];
			})
			.filter(Boolean);

		if (errorList.length) {
			onFinishFailed?.(errors.current);
		} else {
			onFinish?.(values);
		}
	};

	const handleValidateRegister = (name: string, cb: Function) => {
		validatorMap.current.set(name, cb);
	};
	const cls = classNames('form', className);

	return (
		<FormContext.Provider
			value={{
				onValueChange,
				values,
				setValues: (v) => setValues(v),
				validateRegister: handleValidateRegister
			}}
		>
			<form {...restProps} className={cls} onSubmit={handleSubmit}>
				{children}
			</form>
		</FormContext.Provider>
	);
};

export default Form;
