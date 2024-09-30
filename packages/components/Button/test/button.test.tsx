import { render, fireEvent } from '@testing-library/react';
import { describe, expect, vi, test } from 'vitest';
import React from 'react';
import Button from '../button';
import { BaseButtonProps } from '../button';

// 单击事件、禁用、加载
describe('test Button', () => {
	test('button click event', () => {
		const handleCallback = vi.fn();
		const { getByRole } = render(
			<Button onClick={handleCallback}>Click Me</Button>
		);
		const element = getByRole('button');
		fireEvent.click(element);
		expect(handleCallback).toHaveBeenCalled();
	});

	test('disable the button', () => {
		const handleClick = vi.fn();
		const { getByRole } = render(
			<Button onClick={handleClick} disabled>
				Disabled
			</Button>
		);
		const element = getByRole('button');
		fireEvent.click(element);
		expect(handleClick).not.toHaveBeenCalled();
	});

	test('the loading button', () => {
		const { container } = render(
			<Button>
				<i className="wdu-icon-loading"></i>Loading
			</Button>
		);
		const buttonHTML = container.firstChild; // 获取按钮的第一个子元素
		expect(buttonHTML?.firstChild).toBe('<i class="wdu-icon-loading"></i>');
	});
});

// Button 的类型，通过 describe.each() 来简化代码
const defineTypes = [
	{ type: 'primary', expected: 'wdu-button-primary' },
	{ type: 'default', expected: 'wdu-button-default' },
	{ type: 'danger', expected: 'wdu-button-danger' },
	{ type: 'link', expected: 'wdu-button-link' }
];
describe.each(defineTypes)('test the type of button', ({ type, expected }) => {
	test(`returns ${expected}`, () => {
		const { getByRole } = render(
			<Button btnType={type as BaseButtonProps['btnType']}>Button</Button>
		);
		const element = getByRole('button');
		expect(element.classList.contains(expected)).toBeTruthy();
	});
});

// Button 的尺寸
const defineSize = [
	{ size: 'sm', expected: 'wdu-button-small' },
	{ size: 'lg', expected: 'wdu-button-large' }
];
describe.each(defineSize)('test the size of button', ({ size, expected }) => {
	test(`${size} size button`, () => {
		const { getByRole } = render(
			<Button size={size as BaseButtonProps['size']}>Button</Button>
		);
		const element = getByRole('button');
		expect(element.classList.contains(expected)).toBeTruthy();
	});
});
