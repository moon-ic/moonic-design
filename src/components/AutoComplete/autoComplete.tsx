import React, {
	ChangeEvent,
	KeyboardEvent,
	FC,
	ReactElement,
	useEffect,
	useState,
	useRef
} from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';

interface DataSourceObject {
	value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
	/** 用户提供过滤函数 同步&异步*/
	fetchSuggestions: (
		keyword: string
	) => DataSourceType[] | Promise<DataSourceType[]>;
	/** 用户选中提示 执行回调函数 */
	onSelect?: (item: DataSourceType) => void;
	/** 用户自定义 展示提示 */
	renderOption?: (item: DataSourceType) => ReactElement;
}

const AutoComplete: FC<AutoCompleteProps> = (props) => {
	const { fetchSuggestions, onSelect, value, renderOption, ...restProps } =
		props;
	const [inputValue, setInputValue] = useState(value);
	const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
	const [loading, setLoading] = useState(false);
	const [highLightIndex, setHighLigntIndex] = useState<number>(-1);
	const debounceValue = useDebounce(inputValue, 500);
	const triggerSearch = useRef<boolean>(false);
	const componentRef = useRef<HTMLDivElement>(null);

	useClickOutside(componentRef, () => {
		setSuggestions([]);
	});
	useEffect(() => {
		if (debounceValue && triggerSearch) {
			const res = fetchSuggestions(debounceValue as string);
			if (res instanceof Promise) {
				setLoading(true);
				res.then((data) => {
					setSuggestions(data);
				});
				setLoading(false);
			} else {
				setSuggestions(res);
			}
		} else {
			setSuggestions([]);
		}
		setHighLigntIndex(-1);
	}, [debounceValue]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim();
		setInputValue(value);
		triggerSearch.current = true;
	};
	const handleSelect = (item: DataSourceType) => {
		setInputValue(item.value);
		setSuggestions([]);
		if (onSelect) {
			onSelect(item);
		}
		triggerSearch.current = false;
	};
	const highlight = (index: number) => {
		if (index < 0) index = 0;
		if (index >= suggestions.length) {
			index = suggestions.length - 1;
		}
		setHighLigntIndex(index);
	};
	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		switch (e.key) {
			case 'Enter':
				suggestions[highLightIndex] &&
					handleSelect(suggestions[highLightIndex]);
				break;
			case 'Escape':
				setSuggestions([]);
				break;
			case 'ArrowUp':
				highlight(highLightIndex - 1);
				break;
			case 'ArrowDown':
				highlight(highLightIndex + 1);
				break;
			default:
				break;
		}
	};

	const renderTemplate = (item: DataSourceType) => {
		return renderOption ? renderOption(item) : item.value;
	};
	const generateDropdown = () => {
		return (
			<ul>
				{suggestions.map((item, index) => {
					const cls = classNames('suggestion-item', {
						'is-active': index === highLightIndex
					});
					return (
						<li
							key={index}
							className={cls}
							onClick={() => {
								handleSelect(item);
							}}
						>
							{renderTemplate(item)}
						</li>
					);
				})}
			</ul>
		);
	};

	return (
		<div className="auto-complete" ref={componentRef}>
			<Input
				value={inputValue}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				{...restProps}
			/>
			{loading && (
				<ul>
					<Icon icon="spinner" spin />
				</ul>
			)}
			{suggestions.length > 0 && generateDropdown()}
		</div>
	);
};

export default AutoComplete;
